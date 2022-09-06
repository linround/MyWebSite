import React, { useEffect, useRef } from 'react'
import styles from '../webglCommon/style.less'
import { render } from './gl'

export default function Webgl3dTexturesMipmap() {
  const canvasRef = useRef(null)
  const drawTriangles = () => {
    render(canvasRef.current)
  }
  useEffect(() => {
    drawTriangles()
  }, [canvasRef])

  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={256} height={256} ></canvas>

    </div>
  )
}
