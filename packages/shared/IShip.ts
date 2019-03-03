import { ShipElement, SquareElement } from './Elements'
import { ElementManager } from './Managers'

export interface IShip {
  scale: number
  x: number
  y: number

  speed: number
  /** Radian */
  orientation: number

  elements: ShipElement[]

  id: string
}
