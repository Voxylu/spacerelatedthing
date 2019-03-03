import { SquareElement, GameElement } from '..'
import { segmentIntersecting, Segment, Point } from './SegmentIntersection'

export const reactangleCollider = (rect: SquareElement, other: GameElement) => {
  if (other.shape === 'square') {
    const collideInX =
      rect.x < other.x + other.width && rect.x + rect.width > other.x
    const collideInY =
      rect.y < other.y + other.height && rect.y + rect.height > other.y

    return collideInX && collideInY
  } else if (other.shape === 'triangle') {
    const A = new Point(rect.x - rect.width / 2, rect.y - rect.height / 2)
    const B = new Point(rect.x + rect.width / 2, rect.y - rect.height / 2)
    const C = new Point(rect.x + rect.width / 2, rect.y + rect.height / 2)
    const D = new Point(rect.x - rect.width / 2, rect.y + rect.height / 2)
    const mySegments = [
      new Segment(A, B),
      new Segment(B, C),
      new Segment(C, D),
      new Segment(D, A),
    ]
    const otherSegments = [
      new Segment(other.point1, other.point2),
      new Segment(other.point2, other.point3),
      new Segment(other.point3, other.point1),
    ]
    let collision = false
    for (const mySegment of mySegments) {
      for (const otherSegment of otherSegments) {
        if (segmentIntersecting(mySegment, otherSegment)) {
          collision = true
        }
      }
    }
    return collision
  } else if (other.shape === 'circle') {
    const circleDistance = {
      x: Math.abs(other.x - rect.x),
      y: Math.abs(other.y - rect.y),
    }

    if (circleDistance.x > rect.width / 2 + other.radius) {
      return false
    }
    if (circleDistance.y > rect.height / 2 + other.radius) {
      return false
    }
    if (circleDistance.x <= rect.width / 2) {
      return true
    }
    if (circleDistance.y <= rect.height / 2) {
      return true
    }
    const cornerDistanceSq =
      (circleDistance.x - rect.width / 2) ** 2 +
      (circleDistance.y - rect.height / 2) ** 2
    return cornerDistanceSq <= other.radius ** 2
  }
  throw new Error(`shape not implemented: ${other}`)
}
