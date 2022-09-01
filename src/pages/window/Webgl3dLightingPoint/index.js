import React, {
  useEffect, useRef, useState
} from 'react'
import styles from '../webglCommon/style.less'
import { render } from './gl'

export default function Webgl3dLightingPoint() {
  const canvasRef = useRef(null)
  const [r, setValueR] = useState(0)
  const [s, setValueS] = useState(0)
  const handler = {
    update: () => ({}),
  }
  const [fn, setFn] = useState(handler)

  const drawTriangles = () => {
    const func = render(canvasRef.current)
    setFn(func)
  }
  useEffect(() => {
    drawTriangles()
  }, [canvasRef])

  const onRotation = (value) => {
    const { updateRotation, } = fn
    setValueR(+value)
    updateRotation({
      value: +value,
    })
  }
  const onShininess = (value) => {
    const { updateShininess, } = fn
    setValueS(+value)
    updateShininess({
      value: +value,
    })
  }
  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={500} height={500} ></canvas>
      <div className={styles.canvasOperates}>
        <div className={styles.canvasOper}>
          旋转：<input
            type='range'
            max={360} min={0}
            onChange={(e) => onRotation(e.target.value)}
            value={r}/>{r}
        </div>
        <div className={styles.canvasOper}>
          亮度：<input
            type='range'
            max={360} min={0}
            onChange={(e) => onShininess(e.target.value)}
            value={s}/>{s}
        </div>
        <div className={styles.canvasButton} onClick={drawTriangles}>绘制图形</div>
      </div>
    </div>
  )
}
