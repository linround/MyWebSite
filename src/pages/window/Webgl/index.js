import React, { useRef } from 'react'
import styles from './style.less'
import { triangles } from './TRIANGLES'

export function Webgl() {
  const canvasRef = useRef(null)
  const drawTriangles = () => {
    triangles(canvasRef.current)
  }

  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={400} height={300} ></canvas>
      <div className={styles.canvasButton} onClick={drawTriangles}>绘制三角形</div>
    </div>
  )
}
