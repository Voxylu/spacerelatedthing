import { Projectile } from 'spaceward-shared'
import { generate } from 'shortid'

export class ProjectileManager {
  constructor(fn: (p: Projectile) => any) {
    this.shootProjectile = fn
  }
  shootProjectile(projectile: Projectile) {}

  shoot(orientation: number, x: number, y: number, shipId: string) {
    this.shootProjectile(new Projectile(x, y, orientation, generate(), shipId))
  }
}
