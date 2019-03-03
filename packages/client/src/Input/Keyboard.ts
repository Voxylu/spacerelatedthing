import { BaseInputDispatcher } from '.'

export class KeyBoardInput extends BaseInputDispatcher {
  constructor() {
    super()

    window.addEventListener('keypress', this.handleKeyPress)
  }

  handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'q':
      case 'ArrowLeft':
        this.turn('left')
        break
      case 'd':
      case 'ArrowRight':
        this.turn('right')
        break
      case 's':
      case 'ArrowDown':
        this.speed('down')
        break
      case 'z':
      case 'AarrowUp':
        this.speed('up')
        break
      case ' ':
        this.shoot()
        break
    }
  }

  destroy() {
    window.removeEventListener('keypress', this.handleKeyPress)
  }
}
