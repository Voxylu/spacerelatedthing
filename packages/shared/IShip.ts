import { ShipElement } from './Elements'

export interface IShip {
  scale: number
  x: number
  y: number

  speed: number
  collisionRadius: number

  /** Radian */
  orientation: number

  elements: ShipElement[]

  id: string
}
