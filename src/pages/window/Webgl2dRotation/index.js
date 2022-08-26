import React, {
  useEffect, useRef, useState
} from 'react'
import styles from '../webglCommon/style.less'
import { render } from './gl'

export default function Webgl2dRotation() {
  const canvasRef = useRef(null)
  const [valueY, setValueY] = useState(0)
  const [valueX, setValueX] = useState(0)
  const [degree, setDegree] = useState(0)
  const [scale, setScale] = useState(50)
  const handler = {
    update: () => ({}),
  }
  const [fn, setFn] = useState(handler)


  useEffect(() => {
    // 这里只需要
    const sin = Math.sin(((+degree) / 360) * Math.PI * 2)
    const cos = Math.cos(((+degree) / 360) * Math.PI * 2)
    fn.update(
      [+valueX, +valueY], [sin, cos], [(+scale) / 50, (+scale) / 50]
    )
  }, [valueY, valueX, degree, scale])

  const handleSetDegree = (e) => {
    const value = e.target.value
    setDegree(value)
  }
  const handleSetScale = (e) => {
    const value = e.target.value
    setScale((+value))
  }
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
          X：<input type='range' max={400} min={0} onChange={onChangeX} value={valueX}/>
        </div>
        <div>
          Y：<input type='range' max={300} min={0} onChange={onChangeY} value={valueY}/>
        </div>
        <div>
          旋转：<input type='range' max={360} min={0} onChange={handleSetDegree} value={degree}/>
        </div>
        <div>
          缩放：
          <input
            type='range'
            max={100}
            min={0}
            onChange={handleSetScale}
            value={scale}/>
        </div>
        <div className={styles.canvasButton} onClick={drawTriangles}>绘制图形</div>
      </div>
    </div>
  )
}
