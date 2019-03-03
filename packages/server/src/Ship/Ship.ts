import {
  degToRad,
  radToDeg,
  Point,
  ShipElement,
  IShip,
  Message,
  Hook,
  ElementManager,
} from 'spaceward-shared'
import { nosync } from 'colyseus'

interface SpeedOptions {
  maxForward: number
  maxDownard: number
  inc: number
}

export interface ShipOptions {
  id: string
  game: {
    width: number
    height: number
  }
  elements: ShipElement[]
  scale: number
  speedOptions: SpeedOptions
  orientationIncDeg: number
  x: number
  y: number
}

// export const fromObj = (obj: IShip) => {
//   return new Ship(obj.)
// }

export class Ship implements IShip {
  private game: { width: number; height: number }

  public scale: number

  public x: number
  public y: number

  public speed = 0
  private speedOptions: SpeedOptions

  /** Radian */
  public orientation = 0
  private orientationInc: number

  public elements: ShipElement[]

  public id: string

  public listener: (msg: Message) => any = () => {}

  constructor(ops: ShipOptions) {
    this.id = ops.id
    this.game = ops.game
    this.x = ops.x
    this.y = ops.y
    this.scale = ops.scale

    this.elements = ElementManager.getCockpit(this)
    for (const element of ops.elements) {
      const newElems = ElementManager.addElement(this, this.elements, element)
      if (typeof newElems === 'string') {
        console.error(newElems)
      } else {
        // newElems.map((e) => console.log(e.update))
        this.elements = newElems
      }
    }

    this.speedOptions = ops.speedOptions
    this.orientationInc = degToRad(ops.orientationIncDeg)
    this.update(1)
  }

  public speedUp() {
    if (this.speed < this.speedOptions.maxForward) {
      this.speed += this.speedOptions.inc
    }
  }

  public speedDown() {
    if (this.speed > this.speedOptions.maxDownard) {
      this.speed -= this.speedOptions.inc
    }
  }

  public rotateLeft(num = this.orientationInc) {
    if (this.orientation - this.orientationInc < 0) {
      this.orientation = degToRad(360) - num
    } else {
      this.orientation -= num
    }
  }

  public rotateRight() {
    if (this.orientation + this.orientationInc >= degToRad(360)) {
      const rest = radToDeg(this.orientation) - 360
      this.orientation = degToRad(rest) + this.orientationInc
    } else {
      this.orientation += this.orientationInc
    }
  }

  private dx(delta: number) {
    return this.speed * Math.cos(this.orientation) * delta
  }

  private dy(delta: number) {
    return this.speed * Math.sin(this.orientation) * delta
  }

  public update(delta: number) {
    this.x += this.dx(delta)
    this.y += this.dy(delta)

    // this.elements = ElementManager.updateElements(this.elements, th)
    // this.elementManager.updateManager(this.x, this.y)

    // TDO: better
    // check if ship outside
    if (
      this.x < 0 ||
      this.x > this.game.width ||
      this.y < 0 ||
      this.y > this.game.height
    ) {
      this.listener({
        type: 'servermsg',
        payload: { content: 'You are outise', importance: 'high' },
      })
      this.orientation += degToRad(180)
    }

    ElementManager.updateElements(
      this.elements,
      new Point(this.x, this.y),
      this.orientation
    )
  }

  public isDead() {
    // return false
    const cockpit = ElementManager.returnCockpit(this.elements)
    if (cockpit && cockpit.life > 0) {
      return false
    } else {
      return true
    }
    // return ElementManager.returnCockpit(this.elements) ?  : false
  }

  public launchHook(hookId: 'shoot') {
    const hook: Hook = {
      id: hookId,
      shipData: {
        x: this.x,
        y: this.y,
        orientation: this.orientation,
        id: this.id,
      },
    }
    ElementManager.triggerHook(this.elements, hook)
  }
}
