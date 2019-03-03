import { Vancas } from 'vancas'
import { IShip, Viewport, radToDeg, ElementManager } from 'spaceward-shared'
import { drawElement } from './Elements'

interface DrawShipOptions {
  ship: IShip
  playerShip: IShip
  vancas: Vancas
  viewport: Viewport
}

export const drawShip = ({
  ship,
  playerShip,
  vancas,
  viewport,
}: DrawShipOptions) => {
  const isPlayerShip = ship.id == playerShip.id
  if (isPlayerShip) {
    const drawX = Math.floor(viewport.width / 2)
    const drawY = Math.floor(viewport.height / 2)
    vancas.rotationGroup(
      () => {
        for (const element of ship.elements) {
          drawElement({
            element,
            vancas,
            drawX,
            drawY,
            parentX: ship.x,
            parentY: ship.y,
          })
        }
        const possibleCollider = ElementManager.getPossibleCollisionRectangle({
          ...ship,
          x: drawX,
          y: drawY,
        })
        vancas.rect({
          stroke: true,
          color: 'white',
          x: possibleCollider.x,
          y: possibleCollider.y,
          width: possibleCollider.width,
          height: possibleCollider.height,
        })
      },
      {
        x: drawX,
        y: drawY,
        rotation: ship.orientation,
      }
    )
    vancas.text({
      text: `Speed: ${Math.round(ship.speed)}, Orientation: ${Math.round(
        radToDeg(ship.orientation)
      )}`,
      color: 'white',
      align: 'center',
      x: drawX,
      y: drawY + ship.scale + 25,
      font: '15px Arial',
    })
    vancas.text({
      text: `(${Math.round(ship.x)};${Math.round(ship.y)})`,
      color: 'white',
      align: 'center',
      x: drawX,
      y: drawY + ship.scale * 2,
      font: '15px Arial',
    })
  } else {
    vancas
      .group(() => {
        for (const element of ship.elements) {
          drawElement({ element, vancas, parentX: ship.x, parentY: ship.y })
        }
        const possibleCollider = ElementManager.getPossibleCollisionRectangle(
          ship
        )
        // const possibleCollider = ship.possibleCollider(ship.x, ship.y)
        vancas.rect({
          stroke: true,
          color: 'white',
          x: possibleCollider.x,
          y: possibleCollider.y,
          width: possibleCollider.width,
          height: possibleCollider.height,
        })
      })
      .translate({
        x: viewport.width / 2 - playerShip.x,
        y: viewport.height / 2 - playerShip.y,
      })
      .translate({
        x: ship.x,
        y: ship.y,
      })
      .rotate({ rotation: ship.orientation })
      .translate({
        x: -ship.x,
        y: -ship.y,
      })
      .render()
  }
  // vancas
  //   .group(() => {
  //     if (isPlayerShip) {
  //       vancas.circle({
  //         x: viewport.width / 2,
  //         y: viewport.height / 2,
  //         radius: 10,
  //         color: 'red',
  //       })
  //     } else {
  //       vancas.circle({
  //         x: ship.x,
  //         y: ship.y,
  //         radius: 10,
  //       })
  //     }
  //     // vancas.rotationGroup(
  //     //   () => {
  //     //     for (const element of ship.elements) {
  //     //       drawElement({ vancas, element })
  //     //     }
  //     //   },
  //     //   { x: ship.x, y: ship.y, rotation: ship.orientation }
  //     // )
  //   })
  //   .translate(
  //     isPlayerShip
  //       ? { x: 0, y: 0 }
  //       : {
  //           x: viewport.width / 2 - playerShip.x,
  //           y: viewport.height / 2 - playerShip.y,
  //         }
  //   )
  //   .render()
  // vancas.text({
  //   text: `Speed: ${Math.round(this.speed)}, Orientation: ${Math.round(
  //     radToDeg(this.orientation)
  //   )}`,
  //   color: 'white',
  //   align: 'center',
  //   x: this.drawX,
  //   y: this.drawY + this.scale + 25,
  //   font: '15px Arial',
  // })
}
