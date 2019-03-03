import { Room, Client, EntityMap } from 'colyseus'
import { Ship, createShip, messageHandler } from './Ship'
import {
  readMessage,
  SpaceRoomState,
  Message,
  createMessage,
} from 'spaceward-shared'
import {
  possiblyCollide,
  actualltCollide as actualyCollide,
  projectileAndSpaceShip,
} from './collideManager'
import { ProjectileManager } from './Projectiles'

const initialState: SpaceRoomState = {
  game: {
    size: {
      width: 3000,
      height: 3000,
    },
  },
  ships: {},
  projectiles: [],
}

// Tricks
interface TrueSpaceRoomState extends SpaceRoomState {
  ships: EntityMap<Ship>
}

export class SpaceRoom extends Room<TrueSpaceRoomState> {
  private lastTime = 0
  private projectileManager = new ProjectileManager((p) => {
    // p.update(1) // go forward a bit to prevent collison with parent
    this.state.projectiles.push(p)
  })

  onInit() {
    this.setState(initialState)
    this.setSimulationInterval(() => this.update())
  }

  update() {
    const now = Date.now()
    const delta = (now - this.lastTime) / 1000.0

    for (const ship of Object.values(this.state.ships)) {
      ship.update(delta)
      if (ship.isDead()) {
        const client = this.clients.find((c) => c.id === ship.id)
        if (client) {
          const msg: Message = {
            type: 'servermsg',
            payload: {
              content: 'You are dead',
              importance: 'high',
            },
          }
          this.send(client, msg)
          delete this.state.ships[ship.id]
        }
      }
    }

    for (let i = 0; i < this.state.projectiles.length; i++) {
      const projectile = this.state.projectiles[i]
      projectile.update(delta)
      if (projectile.time < 0) {
        this.state.projectiles.splice(i, 1)
      }
    }

    const pAs = projectileAndSpaceShip(
      Object.values(this.state.ships),
      this.state.projectiles
    )

    for (const possibleCollisiton of pAs) {
      const id1 = possibleCollisiton[0].id
      const id2 = possibleCollisiton[1].id

      const ship = Object.values(this.state.ships).find(
        (p) => p.id === id1 || p.id === id2
      )

      const projectile = this.state.projectiles.find(
        (p) => p.id === id1 || p.id === id2
      )

      const BULLETDAMAGE = 10

      if (projectile && ship) {
        for (const elem of ship.elements) {
          const hasCollided = elem.collide(projectile)
          if (hasCollided) {
            elem.life -= BULLETDAMAGE / elem.bulletProtection
          }
        }
      }
    }

    const possibly = possiblyCollide(Object.values(this.state.ships))

    for (const possibleCollisiton of possibly) {
      const ship1 = possibleCollisiton[0]
      const ship2 = possibleCollisiton[1]
      actualyCollide(ship1.elements, ship2.elements)
      // const hasCollided = actualyCollide(ship1.elements, ship2.elements)
      // if (hasCollided) {
      //   const msg: Message = {
      //     type: 'servermsg',
      //     payload: {
      //       content: 'You are dead',
      //       importance: 'high',
      //     },
      //   }
      //   if (ship1.isDead()) {
      //     const client1 = this.clients.find(({ id }) => id === ship1.id)
      //     if (client1) {
      //       this.send(client1, msg)
      //       delete this.state.ships[client1.id]
      //     }
      //   }
      //   if (ship2.isDead()) {
      //     const client2 = this.clients.find(({ id }) => id === ship2.id)
      //     if (client2) {
      //       this.send(client2, msg)
      //       delete this.state.ships[client2.id]
      //     }
      //   }
      // }
    }

    this.lastTime = now
  }

  onJoin(client: Client) {
    this.state.ships[client.id] = createShip({
      game: this.state.game.size,
      id: client.id,
      projectileManage: this.projectileManager,
    })
  }

  onLeave(client: Client) {
    delete this.state.ships[client.id]
  }

  onMessage(client: Client, message: Message) {
    const ship = this.state.ships[client.id]
    if (ship) {
      ship.listener = (msg) => {
        this.send(client, msg)
      }
      if (!ship) {
        throw new Error('yo wtf')
      }
      messageHandler(message, ship)
    }
  }
}
