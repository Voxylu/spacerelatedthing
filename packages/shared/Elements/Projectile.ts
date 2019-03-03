import { ProjectileElement, GameElement } from 'spaceward-shared'

export class Projectile implements ProjectileElement {
  public type: 'ProjectileElement' = 'ProjectileElement'
  public shape: 'circle' = 'circle'
  public radius = 5
  public time = 200
  public speed = 400

  collide(other: GameElement): boolean {
    throw new Error('not implemented')
  }

  public update(delta: number) {
    this.x += Math.cos(this.orientation) * delta * this.speed
    this.y += Math.sin(this.orientation) * delta * this.speed
    this.time--
  }
  constructor(
    public x: number,
    public y: number,
    public orientation: number,
    public id: string,
    public parentId: string
  ) {}
}
