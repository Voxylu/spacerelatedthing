import { Point } from '.'
import { Segment } from './SegmentIntersection'

/** Nothing fancy */
export class BasicVector {
  constructor(public x: number, public y: number) {}

  static fromPoints(a: Point, b: Point) {
    return new BasicVector(b.x - a.x, b.y - a.y)
  }

  dot(vector: BasicVector) {
    return this.x * vector.x + this.y * vector.y
  }

  static mult(v: BasicVector, s: number) {
    return new BasicVector(v.x * s, v.y * s)
  }
}

interface CircleToLineCollideOptions {
  circle: {
    C: Point
    r: number
  }
  line: Segment
}

// export const project = () => {}

export const circleToLineCollide = ({
  circle: { C, r },
  line: { point1: A, point2: B },
}: CircleToLineCollideOptions) => {
  // Get D with CD _|_ AB

  // Vectors
  const AB = BasicVector.fromPoints(A, B)
  const AC = BasicVector.fromPoints(A, C)
  const coef = AB.dot(AC) / AB.dot(AB)
  const AD = BasicVector.mult(AB, coef)

  const D = new Point(A.x + AD.x, A.y + AD.y)

  const CD = new Segment(C, D)

  if (CD.length() > r) {
    return false
  } else {
    return true
  }
}
