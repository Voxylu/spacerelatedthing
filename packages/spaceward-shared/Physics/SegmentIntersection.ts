export class Point {
  constructor(public x: number, public y: number) {}
}

export class Segment {
  constructor(public point1: Point, public point2: Point) {}

  length() {
    return Math.sqrt(
      (this.point1.x - this.point2.x) ** 2 +
        (this.point1.y - this.point2.y) ** 2
    )
  }
}

export function getLineIntersection(
  p0_x: number,
  p0_y: number,
  p1_x: number,
  p1_y: number,
  p2_x: number,
  p2_y: number,
  p3_x: number,
  p3_y: number
) {
  let s1_x = p1_x - p0_x
  let s1_y = p1_y - p0_y
  let s2_x = p3_x - p2_x
  let s2_y = p3_y - p2_y
  // let s, t
  let s =
    (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) /
    (-s2_x * s1_y + s1_x * s2_y)
  let t =
    (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y)

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    // Collision detected
    let intX = p0_x + t * s1_x
    let intY = p0_y + t * s1_y
    return new Point(intX, intY)
  }
  return false
}

// const ccw = (A: Point, B: Point, C: Point) => {
//   return (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x)
// }

export const segmentIntersecting = (
  { point1: A, point2: B }: Segment,
  { point1: C, point2: D }: Segment
) => {
  const res = getLineIntersection(A.x, A.y, B.x, B.y, C.x, C.y, D.x, D.y)
  if (res) {
    return true
  } else {
    return res
  }
}

// export const segmentIntersecting = (
//   { point1: A, point2: B }: Segment,
//   { point1: C, point2: D }: Segment
// ) => {
//   return ccw(A, B, D) !== ccw(B, C, D) && ccw(A, B, C) !== ccw(A, B, D)
// }
