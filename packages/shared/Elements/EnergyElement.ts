import {
  reactangleCollider,
  GameElement,
  SquareShipElement,
} from 'spaceward-shared'
import { BaseElement } from './BaseElement'

export class EnergyElement extends BaseElement implements SquareShipElement {
  public type: 'EnergyElement' = 'EnergyElement'

  public width = 50
  public height = 50

  public shape: 'square' = 'square'

  collide(other: GameElement): boolean {
    return reactangleCollider(this, other)
  }
}
