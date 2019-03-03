import { CircleElement, GameElement } from '../Elements'
import { Segment, Point } from './SegmentIntersection'
import { circleToLineCollide } from './CircleToLine'

interface Circle {
  id: string // internal
  x: number
  y: number
  radius: number
}

export const pureCircleCollider = (
  { x: x1, y: y1, radius: r1 }: Circle,
  { radius: r2, x: x2, y: y2 }: Circle
) => {
  return (x2 - x1) ** 2 + (y1 - y2) ** 2 <= (r1 + r2) ** 2
}

export const circleCollider = (circle: CircleElement, other: GameElement) => {
  if (other.shape === 'square') {
    const circleDistance = {
      x: Math.abs(circle.x - other.x),
      y: Math.abs(circle.y - other.y),
    }

    if (circleDistance.x > other.width / 2 + circle.radius) {
      return false
    }
    if (circleDistance.y > other.height / 2 + circle.radius) {
      return false
    }
    if (circleDistance.x <= other.width / 2) {
      return true
    }
    if (circleDistance.y <= other.height / 2) {
      return true
    }
    const cornerDistanceSq =
      (circleDistance.x - other.width / 2) ** 2 +
      (circleDistance.y - other.height / 2) ** 2
    return cornerDistanceSq <= circle.radius ** 2
  } else if (other.shape === 'triangle') {
    const otherSegments = [
      new Segment(other.point1, other.point2),
      new Segment(other.point2, other.point3),
      new Segment(other.point3, other.point1),
    ]
    let collide = false
    for (const segment of otherSegments) {
      if (
        circleToLineCollide({
          circle: { C: new Point(circle.x, circle.y), r: circle.radius },
          line: segment,
        })
      ) {
        collide = true
      }
    }
    return collide
  }
}
