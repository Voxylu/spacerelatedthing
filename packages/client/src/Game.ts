import { Client, Room } from 'colyseus.js'
import {
  Viewport,
  SpaceRoomState,
  IShip,
  createMessage,
  Message,
  readMessage,
} from 'spaceward-shared'
import { Vancas, createVancas } from 'vancas'
import { drawShip } from './Drawers'
import { Decors } from './Decors'
import {
  BaseInputDispatcher,
  isTouch,
  TouchInput,
  KeyBoardInput,
} from './Input'
import { setTimeout } from 'timers'
import { drawProjectiles } from './Drawers/drawProjectiles'

interface GameOps {
  viewport: Viewport
  serverUrl: string
}

export class Game {
  private client: Client
  public room: Room

  private viewport: Viewport

  public vancas: Vancas

  private playerShip: IShip = {
    x: 0,
    y: 0,
    elements: [],
    id: 'a',
    orientation: 0,
    scale: 0,
    speed: 0,
  }

  private decors: Decors = new Decors({
    game: { width: 0, height: 0 },
    viewport: this.viewport,
  })

  private inputHandler: BaseInputDispatcher

  public alive = false

  private sumDelta = 0

  constructor(ops: GameOps) {
    this.client = new Client(ops.serverUrl)
    this.room = this.client.join('space')
    this.vancas = createVancas(ops.viewport)
    this.viewport = ops.viewport

    this.vancas.update = (d) => this.update(d)
    this.vancas.render = () => this.draw()
    // this.vancas.canvasEl.style.border = '1px solid black'

    if (isTouch()) {
      this.inputHandler = new TouchInput(this.vancas, this.viewport)
    } else {
      this.inputHandler = new KeyBoardInput()
    }
  }

  public updateViewport(viewport: Viewport) {
    this.viewport = viewport
    this.vancas.width = viewport.width
    this.vancas.height = viewport.height
  }

  /** Ugly method to wait until its joined */
  private waitJoin() {
    return new Promise((resolve) => {
      const interval = window.setInterval(() => {
        if (this.room.hasJoined) {
          clearInterval(interval)
          resolve()
        }
      }, 500)
    })
  }

  async setup() {
    await this.waitJoin()
    // await Game.wait(5000)
    // console.log('server joined')

    const state = this.room.state as SpaceRoomState

    console.log(state)

    this.playerShip = state.ships[this.client.id!]

    this.decors = new Decors({
      game: state.game.size,
      viewport: this.viewport,
    })

    this.room.onMessage.add((msg: Message) => {
      if (msg.type === 'servermsg') {
        if ((msg.payload.content = 'You are dead')) {
          this.alive = false
        }
        const notifText = document.createTextNode(msg.payload.content)
        const notifElem = document.createElement('div')
        notifElem.appendChild(notifText)
        notifElem.style.backgroundColor =
          msg.payload.importance === 'high' ? 'red' : 'transparent'
        document.body.appendChild(notifElem)
        setTimeout(() => {
          document.body.removeChild(notifElem)
        }, 2000)
      }
    })

    this.inputHandler.subsribe((msg) => {
      if (this.alive) {
        this.room.send(msg)
      }
    })

    this.alive = true
  }

  destroy() {
    this.inputHandler.destroy()
  }

  update(delta: number) {
    this.sumDelta += delta
    const state = this.room.state as SpaceRoomState
    this.playerShip = state.ships[this.client.id!]
    this.decors.update(this.playerShip.x, this.playerShip.y)
    if (this.sumDelta > 0.05) {
      this.inputHandler.update(this.viewport)
      this.sumDelta = 0
    }
  }

  draw() {
    this.vancas.clear()
    this.vancas.background('black')
    this.vancas.ctx.imageSmoothingEnabled = false
    if (this.alive) {
      const state = this.room.state as SpaceRoomState
      this.decors.draw(this.vancas)

      drawProjectiles({
        playerShip: this.playerShip,
        projectiles: state.projectiles,
        vancas: this.vancas,
        viewport: this.viewport,
      })

      for (const shipId in state.ships) {
        const ship = state.ships[shipId]
        drawShip({
          playerShip: this.playerShip,
          ship,
          vancas: this.vancas,
          viewport: this.viewport,
        })
      }
    }
    this.inputHandler.draw()
  }
}
