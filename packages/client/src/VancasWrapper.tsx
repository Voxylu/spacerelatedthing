import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Vancas } from 'vancas'

export const VanvasWarpper = ({
  vancas,
  ...props
}: { vancas: Vancas } & React.HTMLProps<HTMLDivElement>) => {
  const divGame = useRef<HTMLDivElement>(null)
  const [isSetup, setSetup] = useState(false)

  useEffect(() => {
    if (isSetup === false && divGame.current) {
      divGame.current.appendChild(vancas.canvasEl)
      vancas.start()
      setSetup(false)
    }
    return () => {
      vancas.stop()
    }
  })

  return <div id="game" ref={divGame} {...props} />
}
