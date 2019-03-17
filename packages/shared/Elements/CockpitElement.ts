import {
  reactangleCollider,
  GameElement,
  SquareShipElement,
} from 'spaceward-shared'
import { BaseElement } from './BaseElement'
import { Rectangle } from 'littephysic'

export class CockpitElement extends BaseElement implements SquareShipElement {
  public type: 'CockpitElement' = 'CockpitElement'

  public width = 50
  public height = 50

  public bulletProtection = 2

  public shape: 'square' = 'square'

  getCollider() {
    return new Rectangle(this.x, this.y, this.width, this.height)
  }
}
