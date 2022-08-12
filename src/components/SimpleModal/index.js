import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './style.less'

export function SimpleDialogContainer(props) {
  const active = props.active
  const appName = props.appName
  const close = props.close || (() => {})
  const [width] = useState('50%')
  const [height] = useState('50%')
  return (
    <>
      <div
        className={
          `${styles.simpleModalContent} ` + (active ? `${styles.simpleModalActive}` : '')
        }
        style={{
          width,
          height,
        }}
      >
        <div className={styles.simpleModalHeader}>
          <div className={styles.simpleModalHeaderTitle}>{ appName }</div>
          <div className={ styles.simpleModalHeaderIcons  } onClick={close}>
            X
          </div>
        </div>
        <div className={styles.simpleModalBody}>
          {props.children || '暂无内容'}
        </div>
        <div className={styles.simpleModalFooter}></div>

        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}
SimpleDialogContainer.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.element,
  close: PropTypes.func,
  appName: PropTypes.string,
}
