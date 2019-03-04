import * as React from 'react'
import { render } from 'react-dom'
import { VanvasWarpper } from './VancasWrapper'
import { Game } from './Game'
import { Message } from 'spaceward-shared'

const wsUrl =
  Number(location.port) === 3000
    ? location.origin.replace(/^http/, 'ws').replace('3000', '4000')
    : location.origin.replace(/^http/, 'ws')

const main = async () => {
  const game = new Game({
    serverUrl: wsUrl,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      // width: document.documentElement.clientWidth,
      // height: document.documentElement.clientHeight,
    },
  })

  const resize = () => {
    game.updateViewport({
      width: window.innerWidth,
      height: window.innerHeight,
      // width: document.documentElement.clientWidth,
      // height: document.documentElement.clientHeight,
    })
  }

  window.addEventListener('resize', resize)

  window.addEventListener('orientationchange', resize)

  const tp = (x: number, y: number) => {
    const msg: Message = {
      payload: { x, y },
      type: 'tp',
    }
    game.room.send(msg)
  }

  //@ts-ignore
  window.tp = tp

  await game.setup()

  // @ts-ignore
  window.game = game

  const App = () => <VanvasWarpper vancas={game.vancas} />

  render(<App />, document.getElementById('root'))
}

main()
