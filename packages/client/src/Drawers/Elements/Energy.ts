import { Vancas } from 'vancas'

interface DrawEnergyOptions {
  drawX: number
  drawY: number
  vancas: Vancas
  width: number
  height: number
  life: number
  maxLife: number
}

// const energyColors = ['#00000', '#260508', '#4f0c13', '#b51525']

export const drawEnergy = ({
  drawX,
  drawY,
  vancas,
  height,
  width,
  life,
  maxLife,
}: DrawEnergyOptions) => {
  let color
  if (life > maxLife / 2) {
    color = 'black'
  } else {
    color = 'red'
  }
  vancas.rect({
    x: drawX - width / 2,
    y: drawY - height / 2,
    width: width,
    height: height,
    color,
  })
}
