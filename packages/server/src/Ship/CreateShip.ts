import { Ship, ShipOptions } from './Ship'
import {
  degToRad,
  TriangleOrientation,
  EnergyElement,
  CannonElement,
  ProjectileManager,
} from 'spaceward-shared'
import { random } from 'trucs'

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
      new EnergyElement({ dx: -scale, dy: 0, shipId: ops.id }),
      new CannonElement({
        dx: scale,
        dy: 0,
        orientation: TriangleOrientation.Right,
        projectileManager: ops.projectileManage,
        shipId: ops.id,
      }),
      new EnergyElement({ dx: 0, dy: -scale, shipId: ops.id }),
      new EnergyElement({ dx: 0, dy: -scale * 2, shipId: ops.id }),
      new EnergyElement({ dx: 0, dy: -scale * 3, shipId: ops.id }),
      new EnergyElement({ dx: 0, dy: scale, shipId: ops.id }),
      new EnergyElement({ dx: 0, dy: scale * 2, shipId: ops.id }),
      new EnergyElement({ dx: 0, dy: scale * 3, shipId: ops.id }),
      new CannonElement({
        dx: scale,
        dy: -scale * 3,
        orientation: TriangleOrientation.Right,
        projectileManager: ops.projectileManage,
        shipId: ops.id,
      }),
      new CannonElement({
        dx: scale,
        dy: scale * 3,
        orientation: TriangleOrientation.Right,
        projectileManager: ops.projectileManage,
        shipId: ops.id,
      }),
      // new EnergyElement({ dx: -scale, dy: scale, shipId: ops.id }),
    ],
  }

  // console.log(options.elements.map((e) => e.update))

  return new Ship(options)
}
