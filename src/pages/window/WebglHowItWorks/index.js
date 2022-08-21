import React, { useRef, useState } from 'react'
import styles from '../webglCommon/style.less'
import { rectangle } from './canvasWebgl'

export default function WebglHowItWorks() {
  const canvasRef = useRef(null)
  const [updateHandlers, setHandlers] = useState({})

  const drawTriangles = () => {
    const handlers = rectangle(canvasRef.current)
    setHandlers(handlers)
  }
  const { updateAngle, updatePosition, updateScale, } = updateHandlers
  const onUpdateAngle = (ev) => {
    if (!updateAngle) return
    updateAngle(ev, {
      value: 45,
    })
  }
  const onUpdatePosition = (ev) => {
    if (!updatePosition) return
    updatePosition(ev, {
      value: [100, 100],
    })
  }
  const onUpdateScale = (ev) => {
    if (!updateScale) return
    updateScale(ev, {
      value: [2, 0.5],
    })
  }

  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={400} height={300} ></canvas>
      <div>
        <div className={styles.canvasButton} onClick={drawTriangles}>绘制三角形</div>
        <div className={styles.canvasButton} onClick={onUpdateAngle}>旋转角度</div>
        <div className={styles.canvasButton} onClick={onUpdatePosition}>进行位移</div>
        <div className={styles.canvasButton} onClick={onUpdateScale}>进行缩放</div>
      </div>
    </div>
  )
}
