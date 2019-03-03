import { Room, Client, EntityMap } from 'colyseus'
import { Ship, createShip, messageHandler } from './Ship'
import {
  readMessage,
  SpaceRoomState,
  Message,
  createMessage,
  ProjectileManager,
} from 'spaceward-shared'
import { projectileAndSpaceShip, collisionBetweenShips } from './collideManager'

const initialState: SpaceRoomState = {
  game: {
    size: {
      width: 500,
      height: 500,
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
    this.setSimulationInterval(this.update)
  }

  private sumDelta = 0

  update = () => {
    const now = Date.now()
    const delta = (now - this.lastTime) / 1000.0

    // console.log('is shit comming')

    // this.sumDelta += delta

    // if (this.sumDelta > 1) {
    //   console.log('Here is the state:')
    //   console.log(this.state)
    //   this.sumDelta = 0
    // }

    for (const ship of Object.values(this.state.ships)) {
      ship.update(delta)
      // Check if a spaceship is dead
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

    // console.log('update of ship complete')

    // Update projectiles
    for (let i = 0; i < this.state.projectiles.length; i++) {
      const projectile = this.state.projectiles[i]
      projectile.update(delta)
      if (projectile.time < 0) {
        this.state.projectiles.splice(i, 1)
      }
    }

    // console.log('projectile update finished')

    // Collision between ships and projectiles
    projectileAndSpaceShip(
      Object.values(this.state.ships),
      this.state.projectiles
    )

    // console.log('projectile and space ship collision finishe')

    // Collision between ships
    collisionBetweenShips(Object.values(this.state.ships))

    // console.log('collison betwenn shipp')

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
