import { Ship, ShipOptions } from './Ship'
import { degToRad, TriangleOrientation } from 'spaceward-shared'
import { random } from 'trucs'
import { EnergyElement } from '../Elements/EnergyElement'
import { CannonElement } from '../Elements/CannonElement'
import { ProjectileManager } from '../Projectiles'

interface CreateShipOptions {
  id: string
  game: {
    width: number
    height: number
  }
  projectileManage: ProjectileManager
}

export const createShip = (ops: CreateShipOptions) => {
  const scale = 50
  let options: ShipOptions = {
    id: ops.id,
    game: ops.game,
    orientationIncDeg: 5,
    speedOptions: {
      inc: 5,
      maxDownard: -50,
      maxForward: 200,
    },
    scale,
    x: random(ops.game.width, 0),
    y: random(ops.game.height, 0),
    elements: [
      new EnergyElement({ dx: 0, dy: 0, shipId: ops.id }),
      new EnergyElement({ dx: -scale, dy: 0, shipId: ops.id }),
      // new EnergyElement({ dx: scale, dy: 0 }),
      new CannonElement({
        dx: scale,
        dy: 0,
        orientation: TriangleOrientation.Right,
        projectileManager: ops.projectileManage,
        shipId: ops.id,
      }),
    ],
  }

  return new Ship(options)
}
