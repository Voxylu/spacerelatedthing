interface BaseHook {
  id: string
  shipData: {
    x: number
    y: number
    /** Radian */
    orientation: number
    id: string
  }
}

export interface ShootHook extends BaseHook {
  id: 'shoot'
}

export type Hook = ShootHook
