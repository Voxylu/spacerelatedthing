import { Ship } from './Ship'
import {
  pureCircleCollider,
  ShipElement,
  Projectile,
  ElementManager,
} from 'spaceward-shared'
import { Rectangle } from 'littephysic'

export function forFor<T extends { id: string }, R>(
  elems: T[],
  fn: (eleme: T, otherElem: T) => R
): ({ elems: T[]; r: R })[] {
  const res: ({ elems: T[]; r: R })[] = []
  for (let i = 0; i < elems.length; i++) {
    for (let j = i + 1; j < elems.length; j++) {
      res.push({
        elems: [elems[i], elems[j]],
        r: fn(elems[i], elems[j]),
      })
    }
  }
  return res
}

const BULLETDAMAGE = 20

/** Return [id, id][] */
export const projectileAndSpaceShip = (
  ships: Ship[],
  projectiles: Projectile[]
) => {
  for (const projectile of projectiles) {
    for (const ship of ships) {
      if (ship.id !== projectile.parentId) {
        const shipPossibleCollider = ElementManager.getPossibleCollisionRectangle(
          ship
        )
        let hasCollision = projectile
          .getCollider()
          .collide(shipPossibleCollider)
        if (hasCollision) {
          ElementManager.collide(ship.elements, projectile, (el) => {
            el.life -= BULLETDAMAGE / el.bulletProtection
            console.log(
              `Collision between ${el.type} of ${el.parentId} with projectile ${
                projectile.id
              } of ${projectile.parentId}`
            )
            console.log(el.life)
            projectile.time = 0
          })
        }
      }
    }
  }
}

const HULLDAMAGE = 20

export const collisionBetweenShips = (ships: Ship[]) => {
  const res = forFor(ships, (ship1, ship2) => {
    const ship1PossibleCollider = ElementManager.getPossibleCollisionRectangle(
      ship1
    )
    const ship2PossibleCollider = ElementManager.getPossibleCollisionRectangle(
      ship2
    )
    return ship1PossibleCollider.collide(ship2PossibleCollider)
  })
  const possibleCollisions = res.filter(({ r }) => r).map(({ elems }) => elems)
  for (const possibleCollision of possibleCollisions) {
    const ship1 = possibleCollision[0]
    const ship2 = possibleCollision[1]
    for (const ship1Element of ship1.elements) {
      for (const ship2Element of ship2.elements) {
        let hasCollision = ship1Element
          .getCollider()
          .collide(ship2Element.getCollider())

        if (hasCollision) {
          ship1Element.life -= HULLDAMAGE
          ship2Element.life -= HULLDAMAGE
        }
      }
    }
  }
}
