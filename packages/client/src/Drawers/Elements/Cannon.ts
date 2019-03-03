import { Point, TriangleOrientation } from 'spaceward-shared'
import { Vancas } from 'vancas'

// const cannonColors = ['#90f404', '#f4e004', '#f46804']

interface DrawCannonOptions {
  pieceOrientation: TriangleOrientation
  drawX: number
  drawY: number
  vancas: Vancas
  life: number
  maxLife: number
}

export const drawCannon = ({
  pieceOrientation,
  drawX,
  drawY,
  vancas,
  life,
  maxLife,
}: DrawCannonOptions) => {
  const scale = 50
  let drawPoint1
  let drawPoint2
  let drawPoint3

  if (pieceOrientation === TriangleOrientation.Up) {
    drawPoint1 = new Point(drawX, drawY - scale / 2)
    drawPoint2 = new Point(drawX - scale / 2, drawY + scale / 2)
    drawPoint3 = new Point(drawX + scale / 2, drawY + scale / 2)
  } else if (pieceOrientation === TriangleOrientation.Down) {
    drawPoint1 = new Point(drawX, drawY + scale / 2)
    drawPoint2 = new Point(drawX - scale / 2, drawY - scale / 2)
    drawPoint3 = new Point(drawX + scale / 2, drawY - scale / 2)
  } else if (pieceOrientation === TriangleOrientation.Left) {
    drawPoint1 = new Point(drawX - scale / 2, drawY)
    drawPoint2 = new Point(drawX + scale / 2, drawY - scale / 2)
    drawPoint3 = new Point(drawX + scale / 2, drawY + scale / 2)
  } else {
    drawPoint1 = new Point(drawX + scale / 2, drawY)
    drawPoint2 = new Point(drawX - scale / 2, drawY - scale / 2)
    drawPoint3 = new Point(drawX - scale / 2, drawY + scale / 2)
  }

  // let color
  // if (life > (maxLife / 3) * 2) {
  //   color = cannonColors[2]
  // } else if (life > maxLife / 3) {
  //   color = cannonColors[1]
  // } else {
  //   color = cannonColors[0]
  // }
  vancas.triangle({
    color: 'yellow',
    x1: drawPoint1.x,
    y1: drawPoint1.y,
    x2: drawPoint2.x,
    y2: drawPoint2.y,
    x3: drawPoint3.x,
    y3: drawPoint3.y,
  })
}
