import React, { useEffect, useRef } from 'react'
import styles from '../webglCommon/style.less'
import { myRender } from './gl'

export default function webgl3dGeometryLathe() {
  const canvasRef = useRef(null)
  const drawTriangles = () => {
    myRender(canvasRef.current)
  }
  useEffect(() => {
    drawTriangles()
  }, [canvasRef])

  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={600} height={600} ></canvas>

    </div>
  )
}
