import { Point } from './SegmentIntersection'

export * from './SegmentIntersection'
export * from './RectangleCollider'
export * from './CircleCollider'

export const updatePoint = (
  pointToRotate: Point,
  rotationPoint: Point,
  angle: number
) => {
  return {
    x:
      (pointToRotate.x - rotationPoint.x) * Math.cos(angle) -
      (pointToRotate.y - rotationPoint.y) * Math.sin(angle) +
      rotationPoint.x,
    y:
      (pointToRotate.x - rotationPoint.x) * Math.sin(angle) +
      (pointToRotate.y - rotationPoint.y) * Math.cos(angle) +
      rotationPoint.y,
  }
  // return {
  //   x: (x - xm) * Math.cos(a) - (y - ym) * Math.sin(a) + xm,
  //   y: (x - xm) * Math.sin(a) + (y - ym) * Math.cos(a) + ym,
  // }
}
