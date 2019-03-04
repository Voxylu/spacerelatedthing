import { Message, Viewport } from 'spaceward-shared'

export class BaseInputDispatcher {
  private listener: (msg: Message) => any = () => {}

  public subsribe(fn: (msg: Message) => any) {
    this.listener = fn
  }

  protected turnState: 'left' | 'right' | undefined
  protected speedState: 'up' | 'down' | undefined
  protected shoot: boolean = false

  public update(viewport: Viewport) {
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

  public draw() {}

  public destroy() {}
}

export * from './Keyboard'
export * from './Touch'

export const isTouch = () => {
  return 'ontouchstart' in window
}
