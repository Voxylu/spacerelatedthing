import * as React from 'react'
import { render } from 'react-dom'
import { VanvasWarpper } from './VancasWrapper'
import { Game } from './Game'
import { Message } from 'spaceward-shared'

const wsUrl = process.env.WS_UTL || location.origin.replace(/^http/, 'ws')

const main = async () => {
  const game = new Game({
    serverUrl: wsUrl,
    viewport: { width: 500, height: 500 },
  })

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

  const App = () => (
    <>
      <h1>SpaceWar !</h1>
      {/* <p>ping {game.ping}</p> */}
      <VanvasWarpper vancas={game.vancas} />
    </>
  )

  render(<App />, document.getElementById('root'))
}

main()
