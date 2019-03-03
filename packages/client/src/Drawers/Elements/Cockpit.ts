import { Vancas } from 'vancas'

interface DrawCockpitOptions {
  drawX: number
  drawY: number
  vancas: Vancas
  width: number
  height: number
  life: number
  maxLife: number
}

// const energyColors = ['#00000', '#260508', '#4f0c13', '#b51525']

export const drawCockpit = ({
  drawX,
  drawY,
  vancas,
  height,
  width,
  life,
  maxLife,
}: DrawCockpitOptions) => {
  let color
  if (life > maxLife / 2) {
    color = 'blue'
  } else {
    color = 'brown'
  }
  vancas.rect({
    x: drawX - width / 2,
    y: drawY - height / 2,
    width: width,
    height: height,
    color,
  })
}
