import React  from 'react'
import PropTypes from 'prop-types'
import styles from './style.less'
import { useSelector } from 'react-redux'
import { dialogSelector } from '../../store/dialog'

export function SimpleDialogContainer(props) {
  const active = props.active
  const appName = props.appName
  const close = props.close || (() => {})
  const handleActivateAction = props.handleActivateAction || (() => {})
  const currentDialogId = useSelector(dialogSelector)
  const dialogId = props.dialogId
  // 顶部拉伸

  // 移动弹框
  let posP = [0, 0] // 记录初始的元素的位置信息
  let posM = [0, 0] // 记录鼠标第一次按下时的位置
  let container = {} // 记录需要移动的目标元素
  let operation = 0 // 区分拖拽和缩放
  // 区分缩放的方向
  // 上:[-1,0] x轴上的变化*0 + 原有的宽度 还是等于原有的宽度
  let vec = [0, 0]
  let dimP = [0, 0] // 记录元素一开始的高宽

  const toolDrag = (
    e, op, v
  ) => {
    e.preventDefault()
    // 记录操作类型（0常规位移，1是进行大小缩放）
    operation = op
    // 点击事件触发的位置
    posM = [e.clientY, e.clientX]
    container = e.target.parentElement && e.target.parentElement.parentElement
    if (operation === 1) {
      container = e.target.parentElement
      // 记录当前的方向变化
      vec = v
    }
    // offsetParent 指向最近的包含该元素的定位元素，如果该元素的 style.position 被设置为 "fixed"，则该属性返回 null
    // 获取其相对于第一个定位元素的位置
    posP = [container.offsetTop, container.offsetLeft]
    // 记录按下按钮时，弹框容器的大小
    dimP = [
      parseFloat(getComputedStyle(container).height.replaceAll('px', '')),
      parseFloat(getComputedStyle(container).width.replaceAll('px', ''))
    ]

    document.onmouseup = closeDrag
    document.onmousemove = eleDrag
  }

  const setPos = (top, left) => {
    container.style.top = top + 'px'
    container.style.left = left + 'px'
    // 这里处理在位置改变后的圆角
    container.style.borderRadius = '10px'

  }
  const setDim = (height, width) => {
    container.style.height = height + 'px'
    container.style.width = width + 'px'
    // 这里处理在位置改变后的圆角
    container.style.borderRadius = '10px'
  }

  const eleDrag = (e) => {
    e.preventDefault()
    /**
     * 弹框位置
     * 原始的定位 + 开始点击处的位置与移动过程中事件的位置之差
     */
    let top = posP[0] + (e.clientY - posM[0])
    let left = posP[1] + (e.clientX - posM[1])
    // 高度 = (开始的高度) + 鼠标坐标点Y轴的变化
    let height = dimP[0] + (vec[0] * (e.clientY - posM[0]))
    // 宽度 = (开始的宽度) + 鼠标坐标点X轴的变化
    let width = dimP[1] + (vec[1] * (e.clientX - posM[1]))
    if (operation === 0) {
      setPos(top, left)
    } else {
      //
      height = Math.max(height, 100)
      width = Math.max(width, 100)
      // 对于元素位置的处理，需要考虑之前的transform位置
      top = posP[0] + (Math.min(vec[0], 0) * (height - dimP[0]))
      left = posP[1] + (Math.min(vec[1], 0) * (width - dimP[1]))
      setDim(height, width)
      setPos(top, left)
    }
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
          zIndex: currentDialogId === dialogId ? '9999' : '100',
        }}
        onClick={handleActivateAction}
      >
        <div className={styles.simpleModalHeader}>
          <div className={styles.simpleModalHeaderTitle}
            onMouseDown={(e) => toolDrag(e, 0)}>
            <span className={styles.simpleModalHeaderTitleSpan}>{ appName }</span>
          </div>
          <div className={ styles.simpleModalHeaderIcons  } onClick={close}>
            X
          </div>
        </div>


        <div className={`${styles.simpleModalBody}`}>
          {props.children || null}
        </div>



        <div className={styles.simpleModalFooter}></div>

        <div
          className={styles.simpleModalContentTop}
          onMouseDown={(e) => toolDrag(
            e, 1, [-1, 0]
          )}
        ></div>
        <div
          className={styles.simpleModalContentRight}
          onMouseDown={(e) => toolDrag(
            e, 1, [0, 1]
          )}
        ></div>
        <div
          className={styles.simpleModalContentBottom}
          onMouseDown={(e) => toolDrag(
            e, 1, [1, 0]
          )}
        ></div>
        <div
          className={styles.simpleModalContentLeft}
          onMouseDown={(e) => toolDrag(
            e, 1, [0, -1]
          )}
        ></div>
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
  dialogId: PropTypes.string,
  close: PropTypes.func,
  appName: PropTypes.string,
  handleActivateAction: PropTypes.func,
}
