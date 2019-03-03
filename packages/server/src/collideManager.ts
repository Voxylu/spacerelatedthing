import { Ship } from './Ship'
import { pureCircleCollider, ShipElement, Projectile } from 'spaceward-shared'

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

interface Circle {
  radius: number
  x: number
  y: number
  id: string
  parentId: string
}
const preCollider = (ops1: Circle, ops2: Circle) =>
  pureCircleCollider(
    {
      id: ops1.id,
      radius: ops1.radius,
      x: ops1.x,
      y: ops1.y,
    },
    {
      id: ops2.id,
      radius: ops2.radius,
      x: ops2.x,
      y: ops2.y,
    }
  )

export const possiblyCollide = (ships: Ship[]) => {
  const res = forFor(ships, (s, oS) =>
    preCollider(
      { ...s, radius: s.collisionRadius, parentId: s.id },
      { ...oS, radius: oS.collisionRadius, parentId: s.id }
    )
  )
  const possibly = res.filter((r) => r.r === true).map((r) => r.elems)
  return possibly
}

/** Return [id, id][] */
export const projectileAndSpaceShip = (
  ships: Ship[],
  projectiles: Projectile[]
) => {
  // todo : optimize
  const arragnedShips = ships.map((s) => ({
    id: s.id,
    x: s.x,
    y: s.y,
    radius: s.collisionRadius,
    parentId: s.id,
  }))
  const res = forFor(arragnedShips.concat(projectiles), pureCircleCollider)
  const possibly = res
    .filter((r) => r.r === true)
    .map((r) => r.elems)
    .filter((e) => e[0].parentId !== e[1].parentId)
  return possibly
}

export const actualltCollideBetweenPaS = (
  elems: ShipElement[],
  otherElems: ShipElement[]
) => {
  let hasCollided = false
  for (const elem of elems) {
    for (const otherElem of otherElems) {
      const hasColision = elem.collide(otherElem)
      if (hasColision) {
        hasCollided = true
        elem.life += DAMAGE
        otherElem.life += DAMAGE
      }
    }
  }
  return hasCollided
}

const DAMAGE = -5

export const actualltCollide = (
  elems: ShipElement[],
  otherElems: ShipElement[]
) => {
  let hasCollided = false
  for (const elem of elems) {
    for (const otherElem of otherElems) {
      const hasColision = elem.collide(otherElem)
      if (hasColision) {
        hasCollided = true
        elem.life += DAMAGE
        otherElem.life += DAMAGE
      }
    }
  }
  return hasCollided
}
