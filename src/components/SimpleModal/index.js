import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './style.less'

export function SimpleDialogContainer(props) {
  const active = props.active
  const appName = props.appName
  const close = props.close || (() => {})
  const [curWidth] = useState('30%')
  const [curHeight] = useState('30%')

  // 顶部拉伸

  // 移动弹框
  const [sTop] = useState('50%')
  const [sLeft] = useState('50%')
  const onMoverMouseDown = (e) => {
    console.log(e)
  }
  return (
    <>
      <div
        className={
          `${styles.simpleModalContent} ` + (active ? `${styles.simpleModalActive}` : '')
        }
        onMouseDown={onMoverMouseDown}
        style={{
          width: curWidth,
          height: curHeight,
          top: sTop,
          left: sLeft,
        }}
      >
        <div className={styles.simpleModalHeader}>
          <div className={styles.simpleModalHeaderTitle}>
            <div
              className={styles.simpleModalContentMover}
              data-value='moverMouseDown'
            ></div>
            { appName }
          </div>
          <div className={ styles.simpleModalHeaderIcons  } onClick={close}>
            X
          </div>
        </div>
        <div className={styles.simpleModalBody}>
          {props.children || null}
        </div>
        <div className={styles.simpleModalFooter}></div>

        <div
          className={styles.simpleModalContentTop}
        ></div>
        <div className={styles.simpleModalContentRight}></div>
        <div className={styles.simpleModalContentBottom}></div>
        <div className={styles.simpleModalContentLeft}></div>
      </div>
    </>
  )
}
SimpleDialogContainer.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  close: PropTypes.func,
  appName: PropTypes.string,
}
