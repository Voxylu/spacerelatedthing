import { BaseInputDispatcher } from '.'

export class KeyBoardInput extends BaseInputDispatcher {
  constructor() {
    super()

    window.addEventListener('keydown', this.handeKey)
    window.addEventListener('keyup', this.handeKey)
  }

  handeKey = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'q':
      case 'ArrowLeft':
        this.turnState = e.type === 'keydown' ? 'left' : undefined
        break
      case 'd':
      case 'ArrowRight':
        this.turnState = e.type === 'keydown' ? 'right' : undefined
        break
      case 's':
      case 'ArrowDown':
        this.speedState = e.type === 'keydown' ? 'down' : undefined
        break
      case 'z':
      case 'AarrowUp':
        this.speedState = e.type === 'keydown' ? 'up' : undefined
        break
      case ' ':
        e.type === 'keydown' && (this.shoot = true)
        break
    }
  }

  destroy() {
    window.removeEventListener('keydown', this.handeKey)
    window.removeEventListener('keyup', this.handeKey)
  }
}
