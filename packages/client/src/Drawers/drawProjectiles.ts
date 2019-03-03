import { Vancas } from 'vancas'
import { Projectile, IShip } from 'spaceward-shared'
import { Viewport } from 'spaceward-shared'

interface DrawProjectilesOptions {
  vancas: Vancas
  projectiles: Projectile[]
  playerShip: IShip
  viewport: Viewport
}

export const drawProjectiles = ({
  vancas,
  projectiles,
  playerShip,
  viewport,
}: DrawProjectilesOptions) => {
  vancas
    .group(() => {
      for (const projectile of projectiles) {
        vancas.circle({
          color: 'red',
          x: projectile.x,
          y: projectile.y,
          radius: projectile.radius,
        })
      }
    })
    .translate({
      x: viewport.width / 2 - playerShip.x,
      y: viewport.height / 2 - playerShip.y,
    })
    .render()
}
