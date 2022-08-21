
import React, { useRef } from 'react'
import styles from '../webglCommon/style.less'
import { triangles } from './triangles'

export default function ShadersAndGLSL() {
  const canvasRef = useRef(null)
  const drawTriangles = () => {
    triangles(canvasRef.current)
  }
  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={400} height={300} ></canvas>
      <div>
        <div className={styles.canvasButton} onClick={drawTriangles}>绘制图形</div>
      </div>
    </div>
  )
}
