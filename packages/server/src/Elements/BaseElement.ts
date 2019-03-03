import {
  Hook,
  updatePoint,
  Point,
  BaseShipElement,
  GameElement,
} from 'spaceward-shared'

export interface BaseElementOptions {
  dx: number
  dy: number
  shipId: string
}

export class BaseElement implements BaseShipElement {
  public life = 500
  public maxLife = 500
  public bulletProtection = 1

  public x = 0
  public y = 0
  public id = 'lol-not_impl3tEd'

  public type = 'NotImplemented'

  public parentId: string

  public dx: number
  public dy: number

  constructor(ops: BaseElementOptions) {
    this.parentId = ops.shipId
    this.dx = ops.dx
    this.dy = ops.dy
  }

  collide(other: GameElement) {
    console.error('collide(): not implemented')
    return false
  }

  update(shipPosition: Point, orientation: number) {
    // const { x, y } = updatePoint(
    //   newX + this.dx,
    //   newY + this.dy,
    //   newX,
    //   newY,
    //   orientation
    // )
    const { x, y } = updatePoint(
      new Point(shipPosition.x + this.dx, shipPosition.y + this.dy),
      shipPosition,
      orientation
    )

    this.x = x
    this.y = y
  }

  onHook(hook: Hook) {}
}
