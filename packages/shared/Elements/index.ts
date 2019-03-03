import { Point, Hook } from '../'
import { CannonElement } from './CannonElement'
import { EnergyElement } from './EnergyElement'
import { CockpitElement } from './CockpitElement'

export * from './Projectile'
export * from './BaseElement'
export * from './CockpitElement'
export * from './EnergyElement'
export * from './CannonElement'

export interface Viewport {
  width: number
  height: number
}

export interface BaseElement {
  x: number
  y: number
  id: string
  collide(other: GameElement): boolean
}

export interface SquareElement extends BaseElement {
  shape: 'square'
  width: number
  height: number
}

export interface TriangleElement extends BaseElement {
  shape: 'triangle'
  point1: Point
  point2: Point
  point3: Point
}

export interface CircleElement extends BaseElement {
  shape: 'circle'
  radius: number
}

export type GameElement = SquareElement | TriangleElement | CircleElement

export interface BaseShipElement extends BaseElement {
  life: number
  maxLife: number
  bulletProtection: number

  parentId: string
  parentsElementId: string[]
  childsElementId: string[]

  dx: number
  dy: number
  update(shipPosition: Point, orientation: number): void
  onHook(hook: Hook): void
}

export interface SquareShipElement extends BaseShipElement, SquareElement {
  type: 'EnergyElement' | 'ThrusterElement' | 'CockpitElement'
}

export interface CircleShipElement extends BaseShipElement, CircleElement {
  type: 'CircleElement'
}

export interface ProjectileElement extends CircleElement {
  orientation: number
  parentId: string
  type: 'ProjectileElement'
}

export enum TriangleOrientation {
  Up,
  Down,
  Left,
  Right,
}

export interface TriangleShipElement extends BaseShipElement, TriangleElement {
  type: 'CannonElement'
  pieceOrientation: TriangleOrientation
}

export type ShipElement =
  | SquareShipElement
  | TriangleShipElement
  | CircleShipElement
