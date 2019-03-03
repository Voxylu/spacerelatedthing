import {
  reactangleCollider,
  GameElement,
  SquareShipElement,
} from 'spaceward-shared'
import { BaseElement } from './BaseElement'

export class CockpitElement extends BaseElement implements SquareShipElement {
  public type: 'CockpitElement' = 'CockpitElement'

  public width = 50
  public height = 50

  public bulletProtection = 2

  public shape: 'square' = 'square'

  collide(other: GameElement): boolean {
    return reactangleCollider(this, other)
  }
}
