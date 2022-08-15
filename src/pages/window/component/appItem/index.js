import React, { useState } from 'react'
import styles from './style.less'
import PropTypes from 'prop-types'
import { SimpleDialogContainer } from '../../../../components/SimpleModal'
import { toggleDialog } from '../../../../store/dialog'
import { useDispatch } from 'react-redux'

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 * 这是一个APP应用
 *
 * APP应用的弹框的内容
 * APP的名称
 * APP的图标
 * dialogId 便于激活某个弹框在最上层
 */
export function AppItem(props) {
  const appName = props.appName
  const Content = props.dialogContent
  const dialogId = props.dialogId
  const onAdd = props.onAdd || (() => {})
  const [active, setActive] = useState(false)
  const dispatch = useDispatch()
  const onDoubleClick = function onDoubleClick() {
    setActive(true)
    activateAction()
  }
  // 用于激活某个弹框
  const activateAction = () => {
    dispatch(toggleDialog(dialogId))
  }
  const onContextMenu = function onContextMenu(e) {
    e.preventDefault()
    console.log(appName, e)
  }

  return (
    <>
      <div
        className={styles.appItemContainer}
        onContextMenu={(e) => onContextMenu(e)}
        onDoubleClick={(e) => onDoubleClick(e)}>
        <div className={styles.appItemIcon}>
          { props.children }
        </div>
        <div className={styles.appItemName}>
          <span>{appName}</span>
        </div>
      </div>
      <SimpleDialogContainer
        dialogId={dialogId}
        active={active}
        appName={appName}
        onAdd={onAdd}
        handleActivateAction={activateAction}
        close={() => setActive(false)}>
        { Content || null }
      </SimpleDialogContainer>
    </>
  )
}

AppItem.propTypes = {
  appName: PropTypes.string, // app 应的名称
  children: PropTypes.element, // app 图标组件
  dialogId: PropTypes.string, // app的唯一ID
  dialogContent: PropTypes.oneOfType([ // app弹框后显示的内容
    PropTypes.element,
    PropTypes.string
  ]),
  onAdd: PropTypes.func, // 与弹框的新建操作相关
}
