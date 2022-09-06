import React, {
  useEffect, useRef, useState
} from 'react'
import styles from '../webglCommon/style.less'
import { render } from './gl'

export default function Webgl3dTexturesRepeat() {
  const canvasRef = useRef(null)
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
  const handleChange = (value, type) => {
    const { change, } = fn
    change(value, type)
  }
  return (
    <div>
      <canvas className={ styles.canvasContainer} ref={canvasRef} width={500} height={500} ></canvas>
      <div className={styles.canvasOperates}>
        <button onClick={() => handleChange('REPEAT', 'S')}>S-REPEAT</button>
        <button onClick={() => handleChange('REPEAT', 'T')}>T-REPEAT</button>

        <button onClick={() => handleChange('CLAMP_TO_EDGE', 'S')}>S-CLAMP_TO_EDGE</button>
        <button onClick={() => handleChange('CLAMP_TO_EDGE', 'T')}>T-CLAMP_TO_EDGE</button>

        <button onClick={() => handleChange('MIRRORED_REPEAT', 'S')}>S-MIRRORED_REPEAT</button>
        <button onClick={() => handleChange('MIRRORED_REPEAT', 'T')}>T-MIRRORED_REPEAT</button>

      </div>
    </div>
  )
}
