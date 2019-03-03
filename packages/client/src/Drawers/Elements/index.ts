import { Vancas } from 'vancas'
import { ShipElement } from 'spaceward-shared'
import { drawCannon } from './Cannon'
import { drawEnergy } from './Energy'
import { drawCockpit } from './Cockpit'

interface DrawElementOptions {
  vancas: Vancas
  element: ShipElement
  drawX?: number
  drawY?: number
  parentX: number
  parentY: number
}

export const drawElement = ({
  vancas,
  drawY,
  drawX,
  element,
  parentX,
  parentY,
}: DrawElementOptions) => {
  // const x = drawX ? element.dx + drawX : element.x
  // const y = drawY ? element.dy + drawY : element.y
  const x = drawX ? element.dx + drawX : element.dx + parentX
  const y = drawY ? element.dy + drawY : element.dy + parentY
  if (element.type === 'CannonElement') {
    drawCannon({
      pieceOrientation: element.pieceOrientation,
      drawX: x,
      drawY: y,
      vancas,
      life: element.life,
      maxLife: element.maxLife,
    })
  } else if (element.type === 'EnergyElement') {
    drawEnergy({
      drawX: x,
      drawY: y,
      height: element.height,
      vancas,
      width: element.width,
      life: element.life,
      maxLife: element.maxLife,
    })
  } else if (element.type === 'CockpitElement') {
    drawCockpit({
      drawX: x,
      drawY: y,
      height: element.height,
      vancas,
      width: element.width,
      life: element.life,
      maxLife: element.maxLife,
    })
  }
}
