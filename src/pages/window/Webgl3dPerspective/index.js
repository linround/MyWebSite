import React, { useRef, useState } from 'react'
import styles from '../webglCommon/style.less'
import { render } from './gl'

export default function webgl3dPerspective() {
  const canvasRef = useRef(null)
  const [tx, setValueTX] = useState(18)
  const [ty, setValueTY] = useState(186)
  const [tz, setValueTZ] = useState(-153)
  const [rx, setValueRX] = useState(226)
  const [ry, setValueRY] = useState(228)
  const [rz, setValueRZ] = useState(153)
  const [sx, setValueSX] = useState(39)
  const [sy, setValueSY] = useState(14)
  const [sz, setValueSZ] = useState(-64)
  const [fudgeFactor, setFudgeFactor] = useState(250)
  const [fieldOfViewRadians, setFieldOfViewRadians] = useState(146)

  const handler = {
    update: () => ({}),
  }
  const [fn, setFn] = useState(handler)

  const drawTriangles = () => {
    const func = render(canvasRef.current, {
      rx, ry, rz, tx, ty, tz, sx: sx / 25, sy: +sy / 25, sz: +sz / 25,
      fieldOfViewRadiansVal: fieldOfViewRadians,
      fudgeFactorVal: fudgeFactor,
    })
    setFn(func)
  }
  const onFieldOfViewRadians = (value) => {
    const { updateFieldOfViewRadians, } = fn
    setFieldOfViewRadians(+value)
    updateFieldOfViewRadians(+value)
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

  const onUpdateFudgeFactor = (value) => {
    const { updateFudgeFactor, } = fn
    setFudgeFactor(+value)

    updateFudgeFactor(+value / 200)
  }

  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={400} height={500} ></canvas>
      <div className={styles.canvasOperates}>
        fieldOfViewRadians：{fieldOfViewRadians}
        <div>
          <input
            type='range' max={200} min={1}
            onChange={(e) => onFieldOfViewRadians(e.target.value)}
            value={fieldOfViewRadians}/>
        </div>
        fudgeFactor：{(fudgeFactor / 200).toFixed(2)}
        <div>
          <input
            type='range' max={400} min={0}
            onChange={(e) => onUpdateFudgeFactor(e.target.value)}
            value={fudgeFactor}/>
        </div>
        <div>
          X：<input
            type='range' max={400} min={0}
            onChange={(e) => onTranslation(e.target.value, 0)}
            value={tx}/>{tx}
        </div>
        <div>
          Y：<input
            type='range' max={400} min={0}
            onChange={(e) => onTranslation(e.target.value, 1)}
            value={ty}/>{ty}
        </div>
        <div>
          Z：<input
            type='range'
            max={1} min={-1000}
            onChange={(e) => onTranslation(e.target.value, 2)}
            value={tz}/>{tz}
        </div>
        <div>
          旋转X：<input
            type='range' max={360} min={0}
            onChange={(e) => onRotation(e.target.value, 0)}
            value={rx}/>{rx}
        </div>
        <div>
          旋转Y：<input
            type='range' max={360} min={0}
            onChange={(e) => onRotation(e.target.value, 1)}
            value={ry}/>{ry}
        </div>
        <div>
          旋转Z：<input
            type='range'
            max={360} min={0}
            onChange={(e) => onRotation(e.target.value, 2)}
            value={rz}/>{rz}
        </div>
        <div>
          缩放X：
          <input
            type='range'
            max={100}
            min={0}
            onChange={(e) => onScale(e.target.value, 0)}
            value={sx}/>{sx}
        </div>
        <div>
          缩放Y：
          <input
            type='range'
            max={100}
            min={0}
            onChange={(e) => onScale(e.target.value, 1)}
            value={sy}/>{sy}
        </div>
        <div>
          缩放Z：
          <input
            type='range'
            max={100}
            min={-100}
            onChange={(e) => onScale(e.target.value, 2)}
            value={sz}/>{sz}
        </div>
        <div className={styles.canvasButton} onClick={drawTriangles}>绘制图形</div>
      </div>
    </div>
  )
}
