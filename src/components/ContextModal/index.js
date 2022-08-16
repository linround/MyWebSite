import React from 'react'
import styles from './style.less'

export function ContextModal() {
  document.oncontextmenu = (e) => {
    e.preventDefault()
    const { clientY, clientX, } = e
    console.log(clientY, clientX)
  }
  return (
    <div className={styles.ContextModalContainer}>
      右键弹框
    </div>
  )
}
