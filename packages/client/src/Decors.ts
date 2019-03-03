import { Vancas } from 'vancas'
import { random } from 'trucs'
import { Viewport } from 'spaceward-shared'

class Star {
  private x: number
  private y: number
  private radius: number

  constructor(width: number, height: number) {
    this.x = random(width, 0, true)
    this.y = random(height, 0, true)
    this.radius = random(20, 1, true)
  }

  draw(vancas: Vancas) {
    vancas.circle({
      x: this.x,
      y: this.y,
      radius: this.radius,
      color: '#919105',
    })
  }
}

interface DecorsOptions {
  game: {
    width: number
    height: number
  }
  viewport: Viewport
}

export class Decors {
  private x = 0
  private y = 0
  private stars: Star[] = []
  private numStart = 100

  private viewport: Viewport
  private width: number
  private height: number

  constructor(ops: DecorsOptions) {
    this.width = ops.game.width
    this.height = ops.game.height
    this.viewport = ops.viewport
    for (let i = 0; i < this.numStart; i++) {
      this.stars.push(new Star(this.width, this.height))
    }
  }

  update(shipX: number, shipY: number) {
    this.x = this.viewport.width / 2 - shipX
    this.y = this.viewport.height / 2 - shipY
  }

  draw(vancas: Vancas) {
    vancas
      .group(() => {
        vancas.rect({
          x: 0,
          y: 0,
          width: this.width,
          height: this.height,
          color: '#172947',
        })
        for (const star of this.stars) {
          star.draw(vancas)
        }
      })
      .translate({ x: this.x, y: this.y })
      .render()
  }
}
