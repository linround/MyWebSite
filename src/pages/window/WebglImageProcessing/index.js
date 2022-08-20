
import React, { useRef } from 'react'
import styles from '../webglCommon/style.less'
import { triangles } from './triangles'
import img from './leaves.jpg'

export function WebglImageProcessing() {
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const drawTriangles = () => {
    triangles(canvasRef.current, imgRef.current)
  }
  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={400} height={300} ></canvas>
      <div>

        <div id='ui'></div>
        <div className={styles.canvasButton} onClick={drawTriangles}>绘制图形</div>
        <img src={ img } ref={imgRef}/>
      </div>
    </div>
  )
}
