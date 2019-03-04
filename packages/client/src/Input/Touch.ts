import { BaseInputDispatcher } from '.'
import { Vancas } from 'vancas'
import {
  Viewport,
  reactangleCollider,
  SquareElement,
  CircleElement,
} from 'spaceward-shared'

const getDefaultButton = (id: string): SquareElement => {
  let res: SquareElement = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    collide: () => false,
    id,
    shape: 'square',
  }
  res.collide = (other) => reactangleCollider(res, other)
  return res
}

const touchOnButton = (touch: { x: number; y: number }, btn: SquareElement) => {
  const inX = touch.x > btn.x && touch.x < btn.x + btn.width
  const inY = touch.y > btn.y && touch.y < btn.y + btn.height
  return inX && inY
}

export class TouchInput extends BaseInputDispatcher {
  private buttonWidth = 0
  private buttonOffSet = 0

  private buttonUp = getDefaultButton('btnUp')
  private buttonDown = getDefaultButton('btnDown')
  private buttonLeft = getDefaultButton('btnLeft')
  private buttonRight = getDefaultButton('btnRight')
  private buttonShoot = getDefaultButton('btnShoot')

  constructor(private vancas: Vancas, private viewport: Viewport) {
    super()
    this.update(this.viewport)
    document.addEventListener('touchstart', this.handleTouch)
    document.addEventListener('touchend', this.handleTouch)
  }

  handleTouch = (e: TouchEvent) => {
    const touches = e.type === 'touchstart' ? e.touches : e.changedTouches
    for (let i = 0; i < touches.length; i++) {
      const touch = touches.item(i)
      if (touch) {
        const x = touch.pageX - this.vancas.canvasEl.offsetTop
        const y = touch.pageY - this.vancas.canvasEl.offsetLeft
        const touchImpact = { x, y }
        if (touchOnButton(touchImpact, this.buttonUp)) {
          this.speedState = e.type === 'touchstart' ? 'up' : undefined
        } else if (touchOnButton(touchImpact, this.buttonDown)) {
          this.speedState = e.type === 'touchstart' ? 'down' : undefined
        } else if (touchOnButton(touchImpact, this.buttonLeft)) {
          this.turnState = e.type === 'touchstart' ? 'left' : undefined
        } else if (touchOnButton(touchImpact, this.buttonRight)) {
          this.turnState = e.type === 'touchstart' ? 'right' : undefined
        } else if (touchOnButton(touchImpact, this.buttonShoot)) {
          this.shoot = true
        }
      }
    }
  }

  public update(viewport: Viewport) {
    super.update(viewport)
    this.viewport = viewport
    this.buttonWidth = this.viewport.width / 15
    this.buttonOffSet = this.viewport.width / 20

    // Yep thats ugly af
    this.buttonUp.x =
      this.viewport.width - this.buttonWidth * 2 - this.buttonOffSet
    this.buttonUp.y =
      this.viewport.height - this.buttonWidth * 3 - this.buttonOffSet
    this.buttonUp.width = this.buttonWidth
    this.buttonUp.height = this.buttonWidth

    this.buttonDown.x =
      this.viewport.width - this.buttonWidth * 2 - this.buttonOffSet
    this.buttonDown.y =
      this.viewport.height - this.buttonWidth - this.buttonOffSet
    this.buttonDown.width = this.buttonWidth
    this.buttonDown.height = this.buttonWidth

    this.buttonLeft.x =
      this.viewport.width - this.buttonWidth * 3 - this.buttonOffSet
    this.buttonLeft.y =
      this.viewport.height - this.buttonWidth * 2 - this.buttonOffSet
    this.buttonLeft.width = this.buttonWidth
    this.buttonLeft.height = this.buttonWidth

    this.buttonRight.x =
      this.viewport.width - this.buttonWidth - this.buttonOffSet
    this.buttonRight.y =
      this.viewport.height - this.buttonWidth * 2 - this.buttonOffSet
    this.buttonRight.width = this.buttonWidth
    this.buttonRight.height = this.buttonWidth

    this.buttonShoot.x = this.buttonOffSet
    this.buttonShoot.y =
      this.viewport.height - this.buttonOffSet - this.buttonWidth
    this.buttonShoot.width = this.buttonWidth
    this.buttonShoot.height = this.buttonWidth
  }

  private drawButton(btn: SquareElement) {
    this.vancas.rect({
      ...btn,
      color: 'rgba(221,221,221,0.5)',
    })
  }

  draw() {
    this.drawButton(this.buttonUp)
    this.drawButton(this.buttonDown)
    this.drawButton(this.buttonLeft)
    this.drawButton(this.buttonRight)
    this.drawButton(this.buttonShoot)
  }
}
