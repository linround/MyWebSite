import React, { useRef } from 'react'
import styles from './style.less'
import { triangles } from './TRIANGLES'
import { line } from './line'
import { rectangles } from './rectangles'

export function Webgl() {
  const canvasRef = useRef(null)
  const drawTriangles = () => {
    triangles(canvasRef.current)
  }
  const drawLine = () => {
    line(canvasRef.current)
  }
  const drawRectangles = () => {
    rectangles(canvasRef.current.getContext('webgl'))
  }
  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={400} height={300} ></canvas>
      <div>
        <div className={styles.canvasButton} onClick={drawTriangles}>绘制三角形</div>
        <div className={styles.canvasButton} onClick={drawLine}>绘制矩形</div>
        <div className={styles.canvasButton} onClick={drawRectangles}>绘制50个矩形</div>
      </div>
    </div>
  )
}
