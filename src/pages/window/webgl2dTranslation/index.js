import React, {
  useEffect, useRef, useState
} from 'react'
import styles from '../webglCommon/style.less'
import { render } from './gl'

export default function Webgl2dTranslation() {
  const canvasRef = useRef(null)
  const [valueY, setValueY] = useState(0)

  const [valueX, setValueX] = useState(0)
  const handler = {
    update: () => ({}),
  }
  const [fn, setFn] = useState(handler)
  useEffect(() => {
    fn.update([+valueX, +valueY])
  }, [valueY, valueX])


  const drawTriangles = () => {
    const func = render(canvasRef.current)
    handler.update = func
    setFn({
      update: func,
    })
  }
  const onChangeY = (e) => {
    const value = e.target.value
    setValueY(value)
  }
  const onChangeX = (e) => {
    const value = e.target.value
    setValueX(value)
  }
  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={400} height={300} ></canvas>
      <div>
        <div>
          X
          <input type='range' max={400} min={0} onChange={onChangeX} value={valueX}/>
          Y
          <input type='range' max={300} min={0} onChange={onChangeY} value={valueY}/>
        </div>
        <div className={styles.canvasButton} onClick={drawTriangles}>绘制图形</div>
      </div>
    </div>
  )
}
