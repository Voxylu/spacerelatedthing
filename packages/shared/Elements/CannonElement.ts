import {
  GameElement,
  TriangleShipElement,
  Point,
  TriangleOrientation,
  Hook,
  segmentIntersecting,
} from 'spaceward-shared'
import { BaseElement, BaseElementOptions } from './BaseElement'
import { ProjectileManager } from '../Managers'
import { CollideElement, Segment, Triangle } from 'littephysic'

export interface CannonElementOptions extends BaseElementOptions {
  orientation: TriangleOrientation
  projectileManager: ProjectileManager
}

export class CannonElement extends BaseElement implements TriangleShipElement {
  public life = 300
  public maxLife = 300

  public type: 'CannonElement' = 'CannonElement'

  public shape: 'triangle' = 'triangle'

  /** Sommet */
  public point1: Point = new Point(0, 0)
  public point2: Point = new Point(0, 0)
  public point3: Point = new Point(0, 0)

  public pieceOrientation: TriangleOrientation

  private projectileManager: ProjectileManager

  public scale = 50

  constructor(ops: CannonElementOptions) {
    super(ops)
    this.pieceOrientation = ops.orientation
    this.dx = ops.dx
    this.dy = ops.dy
    this.projectileManager = ops.projectileManager
    // nosync(this, 'projectileManager')
  }

  update(shipPosition: Point, orientation: number) {
    super.update(shipPosition, orientation)
    if (this.pieceOrientation === TriangleOrientation.Up) {
      this.point1 = new Point(this.x, this.y - this.scale / 2)
      this.point2 = new Point(this.x - this.scale / 2, this.y + this.scale / 2)
      this.point3 = new Point(this.x + this.scale / 2, this.y + this.scale / 2)
    } else if (this.pieceOrientation === TriangleOrientation.Down) {
      this.point1 = new Point(this.x, this.y + this.scale / 2)
      this.point2 = new Point(this.x - this.scale / 2, this.y - this.scale / 2)
      this.point3 = new Point(this.x + this.scale / 2, this.y - this.scale / 2)
    } else if (this.pieceOrientation === TriangleOrientation.Left) {
      this.point1 = new Point(this.x - this.scale / 2, this.y)
      this.point2 = new Point(this.x + this.scale / 2, this.y - this.scale / 2)
      this.point3 = new Point(this.x + this.scale / 2, this.y + this.scale / 2)
    } else {
      this.point1 = new Point(this.x + this.scale / 2, this.y)
      this.point2 = new Point(this.x - this.scale / 2, this.y - this.scale / 2)
      this.point3 = new Point(this.x - this.scale / 2, this.y + this.scale / 2)
    }
  }

  // collide(other: GameElement): boolean {
  //   if (other.shape === 'triangle') {
  //     const mySegments = [
  //       new Segment(this.point1, this.point2),
  //       new Segment(this.point2, this.point3),
  //       new Segment(this.point3, this.point1),
  //     ]
  //     const otherSegments = [
  //       new Segment(other.point1, other.point2),
  //       new Segment(other.point2, other.point3),
  //       new Segment(other.point3, other.point1),
  //     ]
  //     let collision = false
  //     for (const mySegment of mySegments) {
  //       for (const otherSegment of otherSegments) {
  //         if (segmentIntersecting(mySegment, otherSegment)) {
  //           collision = true
  //         }
  //       }
  //     }
  //     return collision
  //   } else if (other.shape === 'square') {
  //     const A = new Point(other.x - other.width / 2, other.y - other.height / 2)
  //     const B = new Point(other.x + other.width / 2, other.y - other.height / 2)
  //     const C = new Point(other.x + other.width / 2, other.y + other.height / 2)
  //     const D = new Point(other.x - other.width / 2, other.y + other.height / 2)
  //     const otherSegments = [
  //       new Segment(A, B),
  //       new Segment(B, C),
  //       new Segment(C, D),
  //       new Segment(D, A),
  //     ]
  //     const mySegments = [
  //       new Segment(this.point1, this.point2),
  //       new Segment(this.point2, this.point3),
  //       new Segment(this.point3, this.point1),
  //     ]
  //     let collision = false
  //     for (const mySegment of mySegments) {
  //       for (const otherSegment of otherSegments) {
  //         if (segmentIntersecting(mySegment, otherSegment)) {
  //           collision = true
  //         }
  //       }
  //     }
  //     return collision
  //   } else if (other.shape === 'circle') {
  //     const otherSegments = [
  //       new Segment(this.point1, this.point2),
  //       new Segment(this.point2, this.point3),
  //       new Segment(this.point3, this.point1),
  //     ]
  //     let collide = false
  //     for (const segment of otherSegments) {
  //       if (
  //         circleToLineCollide({
  //           circle: { C: new Point(other.x, other.y), r: other.radius },
  //           line: segment,
  //         })
  //       ) {
  //         collide = true
  //       }
  //     }
  //     return collide
  //   }
  //   throw new Error(`not impelmented mdr ${other}`)
  // }

  getCollider() {
    return new Triangle(this.point1, this.point2, this.point3)
  }

  onHook(hook: Hook) {
    if (hook.id === 'shoot') {
      this.projectileManager.shoot(
        hook.shipData.orientation,
        this.x,
        this.y,
        hook.shipData.id
      )
    }
  }
}
