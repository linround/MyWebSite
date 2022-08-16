import React  from 'react'
import PropTypes from 'prop-types'
import styles from './style.less'
import { useSelector } from 'react-redux'
import { dialogSelector } from '../../store/dialog'
import { MenusFunction } from '../../pages/window/component/MenusFunction'
import { FolderBody } from '../../pages/window/component/FolderBody'
import { MyIcon } from '../Icon'
import * as VConsole from 'vconsole'
import { isMobile } from '../../utils/devices'


const minHeight = 200
const minWidth = 200
new VConsole()
export function SimpleDialogContainer(props) {
  const active = props.active
  const appName = props.appName
  const close = props.close || (() => {})
  const handleActivateAction = props.handleActivateAction || (() => {})
  const currentDialogId = useSelector(dialogSelector)
  const dialogId = props.dialogId
  const onAdd = props.onAdd || (() => {})
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
    // e.preventDefault()
    // 记录操作类型（0常规位移，1是进行大小缩放）
    operation = op
    // 点击事件触发的位置
    if (isMobile()) {
      posM = [e.touches[0].clientY, e.touches[0].clientX]
    } else {
      posM = [e.clientY, e.clientX]
    }
    container = e.currentTarget.parentElement && e.currentTarget.parentElement.parentElement
    if (operation === 1) {
      container = e.currentTarget.parentElement
      // 记录当前的方向变化
      vec = v
    }
    // offsetParent 指向最近的包含该元素的定位元素，如果该元素的 style.position 被设置为 "fixed"，则该属性返回 null
    // 获取其相对于第一个定位元素的位置
    posP = [container.offsetTop, container.offsetLeft]
    // 记录按下按钮时，弹框容器的大小
    dimP = [
      parseFloat(String(getComputedStyle(container).height)
        .replace('px', '')),
      parseFloat(String(getComputedStyle(container).width)
        .replace('px', ''))
    ]

    if (isMobile()) {
      document.ontouchend = closeDrag

      document.ontouchmove = eleDrag
    } else {

      document.onmouseup = closeDrag
      document.onmousemove = eleDrag
    }
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
    // e.preventDefault()
    /**
     * 弹框位置
     * 原始的定位 + 开始点击处的位置与移动过程中事件的位置之差
     */



    let x; let y
    if (isMobile()) {
      x = e.touches[0].clientX
      y = e.touches[0].clientY
    } else {
      x = e.clientX
      y = e.clientY
    }
    let top = posP[0] + (y - posM[0])
    let left = posP[1] + (x - posM[1])
    // 高度 = (开始的高度) + 鼠标坐标点Y轴的变化
    let height = dimP[0] + (vec[0] * (y - posM[0]))
    // 宽度 = (开始的宽度) + 鼠标坐标点X轴的变化
    let width = dimP[1] + (vec[1] * (x - posM[1]))

    if (operation === 0) {
      setPos(top, left)
    } else {

      height = Math.max(height, minHeight)
      width = Math.max(width, minWidth)
      // 对于元素位置的处理，需要考虑之前的transform位置
      top = posP[0] + (Math.min(vec[0], 0) * (height - dimP[0]))
      left = posP[1] + (Math.min(vec[1], 0) * (width - dimP[1]))
      setDim(height, width)
      setPos(top, left)
    }
  }

  const closeDrag = () => {
    document.onmouseup = null
    document.ontouchend = null

    document.ontouchmove = null
    document.onmousemove = null
  }


  return (
    <>
      <div className={ `${styles.simpleModalContent} ` + (active ? `${styles.simpleModalActive}` : '') }
        style={{ zIndex: currentDialogId === dialogId ? '9999' : '100', }}
        onMouseDown={handleActivateAction}>
        <div className={styles.simpleModalHeader}>
          <div className={styles.simpleModalHeaderTitle}
            onTouchStart={(e) => toolDrag(e, 0)}
            onMouseDown={(e) => toolDrag(e, 0)}>
            <span className={styles.simpleModalHeaderTitleSpan}>{ appName }</span>
          </div>
          <div className={ styles.simpleModalHeaderIcons  } onClick={close}>
            <MyIcon iconName='faX'/>
          </div>
        </div>
        <MenusFunction onAdd={onAdd}/>
        <div className={`${styles.simpleModalBody}`}>
          {props.children || <FolderBody />}
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
  active: PropTypes.bool, // 激活弹框
  children: PropTypes.oneOfType([ // 弹框的内容 默认是文件夹的弹框
    PropTypes.element,
    PropTypes.string
  ]),
  dialogId: PropTypes.string, // 弹框的ID 这个与后续弹框的层级显示有关
  close: PropTypes.func, // 关闭弹框的操作
  appName: PropTypes.string, // 打开弹框后的 弹框标题
  handleActivateAction: PropTypes.func, // 激活当前弹框（即层级优先显示）
  onAdd: PropTypes.func, // 菜单栏的新建操作
}
