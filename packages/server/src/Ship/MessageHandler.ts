import { Message } from 'spaceward-shared'
import { Ship } from '.'

export const messageHandler = (msg: Message, ship: Ship) => {
  if (msg.type === 'rotate') {
    if (msg.payload.direction === 'left') {
      ship.rotateLeft()
    } else {
      ship.rotateRight()
    }
  } else if (msg.type === 'speed') {
    if (msg.payload.action === 'down') {
      ship.speedDown()
    } else {
      ship.speedUp()
    }
  } else if (msg.type === 'tp') {
    ship.x = msg.payload.x
    ship.y = msg.payload.y
  } else if (msg.type === 'shoot') {
    ship.launchHook('shoot')
  }
}
