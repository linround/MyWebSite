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
  let posP = [0, 0]
  let posM = [0, 0]
  let container = {}

  const toolDrag = (e) => {
    e.preventDefault()
    // 点击事件触发的位置
    posM = [e.clientY, e.clientX]
    container = e.target.parentElement && e.target.parentElement.parentElement
    // offsetParent 指向最近的包含该元素的定位元素，如果该元素的 style.position 被设置为 "fixed"，则该属性返回 null
    // 获取其相对于第一个定位元素的位置
    posP = [container.offsetTop, container.offsetLeft]


    document.onmouseup = closeDrag
    document.onmousemove = eleDrag
  }

  const setPos = (pos0, pos1) => {
    container.style.top = pos0 + 'px'
    container.style.left = pos1 + 'px'
  }


  const eleDrag = (e) => {
    e.preventDefault()
    /**
     * 弹框位置
     * 原始的定位 + 开始点击处的位置与移动过程中事件的位置之差
     */
    const pos0 = posP[0] + (e.clientY - posM[0])
    const pos1 = posP[1] + (e.clientX - posM[1])
    setPos(pos0, pos1)
  }

  const closeDrag = () => {
    document.onmouseup = null
    document.onmousemove = null
  }


  return (
    <>
      <div
        className={
          `${styles.simpleModalContent} ` + (active ? `${styles.simpleModalActive}` : '')
        }
        style={{
          width: curWidth,
          height: curHeight,
          top: sTop,
          left: sLeft,
        }}
      >
        <div className={styles.simpleModalHeader}>
          <div className={styles.simpleModalHeaderTitle}
            onMouseDown={toolDrag}>
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
