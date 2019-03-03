import { IShip } from './IShip'
import { ProjectileElement, Projectile } from './Elements'

export interface Player {
  id: string
  x: number
  y: number
  orientation: number
}

export interface EntityMap<T> {
  [entityId: string]: T
}

export interface BaseRoomState {
  players: Player[]
  size: {
    width: number
    height: number
  }
}

export interface Viewport {
  width: number
  height: number
}

export const degToRad = (deg: number) => (deg * Math.PI) / 180
export const radToDeg = (rad: number) => (rad * 180) / Math.PI

export * from './Hooks'
export * from './Physics'
export * from './Messages'
export * from './Elements'
export * from './IShip'
export * from './Managers'
export interface SpaceRoomState {
  game: {
    size: {
      width: number
      height: number
    }
    // Additional params like speed etc... will go here
  }
  ships: EntityMap<IShip>
  projectiles: Projectile[]
}
