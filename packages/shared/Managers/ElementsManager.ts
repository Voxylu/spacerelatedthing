import { IShip } from '..'
import {
  CockpitElement,
  BaseShipElement,
  GameElement,
  SquareElement,
  ShipElement,
} from '../Elements'
import { BaseElement } from '../Elements/BaseElement'
import { Point, reactangleCollider } from '../Physics'
import { Hook } from '../Hooks'

export class ElementManager {
  // public cockpit = new CockpitElement({ dx: 0, dy: 0, shipId: this.ship.id })
  // public elements: ShipElement[] = [this.cockpit]

  // constructor() // private ship: { id: string; x: number; y: number; scale: number }
  // {}

  // public updateManager(x: number, y: number) {
  //   this.ship.x = x
  //   this.ship.y = y
  // }

  static getCockpit(ship: IShip) {
    return [new CockpitElement({ dx: 0, dy: 0, shipId: ship.id })]
  }

  static returnCockpit(baseElements: ShipElement[]): ShipElement | false {
    return baseElements.find((el) => el.type === 'CockpitElement') || false
  }

  static addElement(
    ship: IShip,
    _baseElements: ShipElement[],
    _element: ShipElement
  ): ShipElement[] | string {
    const baseElements = _baseElements.slice(0)
    const element = _element
    // return 'e'
    // Find if not alread
    const possibleElementAtPosition = baseElements.find(
      (el) => el.dx === element.dx && el.dy === element.dy
    )
    if (possibleElementAtPosition) {
      return 'Element already at this position'
    }
    // return true
    const possiblesElementsRelativePositions = [
      new Point(element.dx - ship.scale, element.dy),
      new Point(element.dx + ship.scale, element.dy),
      new Point(element.dx, element.dy - ship.scale),
      new Point(element.dx, element.dy + ship.scale),
    ]
    for (const posElPos of possiblesElementsRelativePositions) {
      const possibleElement = baseElements.find(
        (el) => el.dx === posElPos.x && el.dy === posElPos.y
      )
      if (possibleElement) {
        element.parentsElementId.push(possibleElement.id)
        possibleElement.childsElementId.push(element.id)
      }
    }
    if (element.parentsElementId.length === 0) {
      return 'No parent found'
    } else {
      return [...baseElements, element]
      // return true
    }
  }

  static getPossibleCollisionRectangle(ship: IShip) {
    const maxDx = { p: 0, n: 0 }
    const maxDy = { p: 0, n: 0 }
    for (const element of ship.elements) {
      if (element.dx > 0 && element.dx > maxDx.p) {
        maxDx.p = element.dx
      } else if (element.dx < 0 && Math.abs(element.dx) > maxDx.n) {
        maxDx.n = Math.abs(element.dx)
      }
      if (element.dy > 0 && element.dy > maxDy.p) {
        maxDy.p = element.dy
      } else if (element.dy < 0 && Math.abs(element.dy) > maxDy.n) {
        maxDy.n = Math.abs(element.dy)
      }
    }
    let res: SquareElement = {
      collide: () => false, // Defined after,
      height: maxDy.p + maxDy.n + ship.scale,
      width: maxDx.p + maxDx.n + ship.scale,
      x: ship.x - maxDx.n - ship.scale / 2,
      y: ship.y - maxDy.n - ship.scale / 2,
      id: ship.id,
      shape: 'square',
    }
    res.collide = (other) => reactangleCollider(res, other)
    return res
  }

  // public getPossibleCollisionRectangle(): SquareElement {
  //   return {
  //     collide: () => {
  //       console.log('yo')
  //       return false
  //     },
  //     height: 10,
  //     width: 10,
  //     id: 'e',
  //     shape: 'square',
  //     x: this.ship.x,
  //     y: this.ship.y,
  //   }
  // const maxDx = { p: 0, n: 0 }
  // const maxDy = { p: 0, n: 0 }
  // for (const element of this.elements) {
  //   if (element.dx > 0 && element.dx > maxDx.p) {
  //     maxDx.p = element.dx
  //   } else if (element.dx < 0 && Math.abs(element.dx) > maxDx.n) {
  //     maxDx.n = Math.abs(element.dx)
  //   }
  //   if (element.dy > 0 && element.dy > maxDy.p) {
  //     maxDy.p = element.dy
  //   } else if (element.dy < 0 && Math.abs(element.dy) > maxDy.n) {
  //     maxDy.n = Math.abs(element.dy)
  //   }
  // }
  // let res: SquareElement = {
  //   collide: () => false, // Defined after,
  //   height: maxDy.p + maxDy.n,
  //   width: maxDx.p + maxDx.n,
  //   x: this.ship.x - maxDx.n,
  //   y: this.ship.y - maxDy.n,
  //   id: this.ship.id,
  //   shape: 'square',
  // }
  // res.collide = (other) => reactangleCollider(res, other)
  // return res
  // }

  static collide<T extends GameElement>(
    baseElements: ShipElement[],
    other: T,
    fnIfTrue: (element: ShipElement, other: T) => any
  ) {
    for (const element of baseElements) {
      const hasCollision = element.collide(other)
      if (hasCollision) {
        fnIfTrue(element, other)
      }
    }
  }

  static updateElements(
    _baseElements: ShipElement[],
    shipPosition: Point,
    shipOrientation: number
  ) {
    const baseElements = _baseElements.slice(0)
    for (const element of baseElements) {
      element.update(shipPosition, shipOrientation)
      if (element.life <= 0) {
        ElementManager.removeElement(baseElements, element.id)
      }
    }
    return baseElements
  }

  static triggerHook(baseElements: ShipElement[], hook: Hook) {
    for (const element of baseElements) {
      element.onHook(hook)
    }
  }

  static removeElement(
    _baseElements: ShipElement[],
    elementId: string
  ): ShipElement[] {
    const baseElements = _baseElements.slice(0)
    const elementI = baseElements.findIndex((el) => el.id === elementId)
    if (elementI !== -1) {
      const element = baseElements[elementI]
      if (element.parentsElementId.length === 0) {
        baseElements.splice(elementI, 1)
      } else {
        // Remove the element from his parents
        for (const parentId of element.parentsElementId) {
          const parent = baseElements.find(({ id }) => id === parentId)
          if (parent) {
            parent.childsElementId = parent.childsElementId.filter(
              (id) => id !== elementId
            )
          }
        }
        // Remove him from his childrens and if they now orphans remove them
        // Well that horrible
        for (const childrenId of element.childsElementId) {
          const children = baseElements.find((el) => el.id === childrenId)
          if (children) {
            children.parentsElementId = children.parentsElementId.filter(
              (id) => id !== elementId
            )
            if (children.parentsElementId.length === 0) {
              const childrenI = baseElements.findIndex(
                (el) => el.id === children.id
              )
              baseElements.splice(childrenI, 1)
            }
          }
        }
      }
    }
    return baseElements
  }
}
