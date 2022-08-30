import React, {
  useEffect, useRef, useState
} from 'react'
import styles from '../webglCommon/style.less'
import { render } from './gl'

export default function Webgl3dLightingDirectional() {
  const canvasRef = useRef(null)
  const [r, setValueR] = useState(0)
  const [fov, setFov] = useState(15)
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

  const onSetFov = (value) => {

    const { updateFieldOfViewRadians, } = fn
    setFov(+value)
    updateFieldOfViewRadians(+value)
  }
  const onRotation = (value) => {
    const { updateRotation, } = fn
    setValueR(+value)
    updateRotation({
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
            onChange={(e) => onRotation(e.target.value, 2)}
            value={r}/>{r}
        </div>
        <div className={styles.canvasOper}>
          视锥的角度：<input
            type='range'
            max={300} min={10}
            onChange={(e) => onSetFov(e.target.value, 2)}
            value={fov}/>{fov}
        </div>
        <div className={styles.canvasButton} onClick={drawTriangles}>绘制图形</div>
      </div>
    </div>
  )
}
