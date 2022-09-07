import React, {
  useEffect, useRef, useState
} from 'react'
import styles from '../webglCommon/style.less'
import { render } from './gl'

export default function WebglDataTextures() {
  const canvasRef = useRef(null)
  const handler = {
    update: () => ({}),
  }
  const [fn, setFn] = useState(handler)
  const drawTriangles = () => {
    const func =  render(canvasRef.current)
    setFn(func)
  }

  const onUpdateFudgeFactor = () => {
    const { update, } = fn
    update()
  }

  useEffect(() => {
    drawTriangles()
  }, [canvasRef])

  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={600} height={600} ></canvas>
      <button onClick={onUpdateFudgeFactor}>onUpdate</button>
    </div>
  )
}
