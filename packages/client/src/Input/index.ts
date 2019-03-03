import { Message } from 'spaceward-shared'

export class BaseInputDispatcher {
  private listener: (msg: Message) => any = () => {}

  public subsribe(fn: (msg: Message) => any) {
    this.listener = fn
  }

  protected turnState: 'left' | 'right' | undefined
  protected speedState: 'up' | 'down' | undefined
  protected shoot: boolean = false

  public update() {
    if (this.turnState) {
      this.listener({
        type: 'rotate',
        payload: { direction: this.turnState },
      })
    }
    if (this.speedState) {
      this.listener({
        type: 'speed',
        payload: { action: this.speedState },
      })
    }
    if (this.shoot) {
      this.listener({
        type: 'shoot',
      })
      this.shoot = false
    }
  }

  // protected turn(direction: 'left' | 'right') {
  //   this.listener({
  //     type: 'rotate',
  //     payload: { direction },
  //   })
  // }

  // protected speed(action: 'up' | 'down') {
  //   this.listener({
  //     payload: { action },
  //     type: 'speed',
  //   })
  // }

  // protected shoot() {
  //   this.listener({ type: 'shoot' })
  // }

  public destroy() {}
}

export * from './Keyboard'
export * from './Touch'

export const isTouch = () => {
  return 'ontouchstart' in window
}
