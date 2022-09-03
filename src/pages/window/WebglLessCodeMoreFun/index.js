import React, { useEffect, useRef } from 'react'
import styles from '../webglCommon/style.less'
import { render } from './gl'

export default function WebglLessCodeMoreFun() {
  const canvasRef = useRef(null)
  const drawTriangles = () => {
    render(canvasRef.current)
  }
  useEffect(() => {
    drawTriangles()
  }, [canvasRef])

  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={500} height={500} ></canvas>

    </div>
  )
}
