import React, { useRef } from 'react'
import styles from '../webglCommon/style.less'
import img from '../WebglImageProcessing/leaves.jpg'
import { render } from './gl'

export default function WebglImageProcess2() {
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const uiRef = useRef(null)
  const drawTriangles = () => {
    render(
      canvasRef.current, imgRef.current, uiRef.current
    )
  }
  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={400} height={300} ></canvas>
      <div>

        <div className={styles.canvasUi} ref={uiRef}></div>
        <div className={styles.canvasButton} onClick={drawTriangles}>绘制图形</div>
        <img src={ img } ref={imgRef}/>
      </div>
    </div>
  )
}
