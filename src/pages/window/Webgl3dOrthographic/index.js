import React, { useRef, useState } from 'react'
import styles from '../webglCommon/style.less'
import { render } from './gl'

export default function Webgl3dOrthographic() {
  const canvasRef = useRef(null)
  const [tx, setValueTX] = useState(0)
  const [ty, setValueTY] = useState(0)
  const [tz, setValueTZ] = useState(0)
  const [sx, setValueSX] = useState(0)
  const [sy, setValueSY] = useState(0)
  const [sz, setValueSZ] = useState(0)
  const [rx, setValueRX] = useState(0)
  const [ry, setValueRY] = useState(0)
  const [rz, setValueRZ] = useState(0)
  const handler = {
    update: () => ({}),
  }
  const [fn, setFn] = useState(handler)

  const drawTriangles = () => {
    const func = render(canvasRef.current)
    setFn(func)
  }
  const onScale = (value, index) => {
    const { updateScale, } = fn
    if (+index === 0) {
      setValueSX(+value)
    } else if (+index === 1) {

      setValueSY(+value)
    } else {
      setValueSZ(+value)
    }
    updateScale(+index, +value / 25)
  }
  const onRotation = (value, index) => {
    const { updateRotation, } = fn
    if (+index === 0) {
      setValueRX(+value)
    } else if (+index === 1) {

      setValueRY(+value)
    } else {
      setValueRZ(+value)
    }
    updateRotation(+index, +value)
  }
  const onTranslation = (value, index) => {

    const { updatePosition, } = fn
    if (+index === 0) {
      setValueTX(+value)
    } else if (+index === 1) {

      setValueTY(+value)
    } else {
      setValueTZ(+value)
    }
    updatePosition(+index, +value)
  }
  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={400} height={300} ></canvas>
      <div>
        <div>
          X：<input
            type='range' max={400} min={0}
            onChange={(e) => onTranslation(e.target.value, 0)}
            value={tx}/>
        </div>
        <div>
          Y：<input
            type='range' max={400} min={0}
            onChange={(e) => onTranslation(e.target.value, 1)}
            value={ty}/>
        </div>
        <div>
          Z：<input
            type='range'
            max={400} min={0}
            onChange={(e) => onTranslation(e.target.value, 2)}
            value={tz}/>
        </div>
        <div>
          旋转X：<input
            type='range' max={360} min={0}
            onChange={(e) => onRotation(e.target.value, 0)}
            value={rx}/>
        </div>
        <div>
          旋转Y：<input
            type='range' max={360} min={0}
            onChange={(e) => onRotation(e.target.value, 1)}
            value={ry}/>
        </div>
        <div>
          旋转Z：<input
            type='range'
            max={360} min={0}
            onChange={(e) => onRotation(e.target.value, 2)}
            value={rz}/>
        </div>
        <div>
          缩放X：
          <input
            type='range'
            max={100}
            min={0}
            onChange={(e) => onScale(e.target.value, 0)}
            value={sx}/>
        </div>
        <div>
          缩放Y：
          <input
            type='range'
            max={100}
            min={0}
            onChange={(e) => onScale(e.target.value, 1)}
            value={sy}/>
        </div>
        <div>
          缩放Z：
          <input
            type='range'
            max={100}
            min={0}
            onChange={(e) => onScale(e.target.value, 2)}
            value={sz}/>
        </div>
        <div className={styles.canvasButton} onClick={drawTriangles}>绘制图形</div>
      </div>
    </div>
  )
}
