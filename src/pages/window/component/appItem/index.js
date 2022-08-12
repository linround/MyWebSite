import React, { useState } from 'react'
import styles from './style.less'
import PropTypes from 'prop-types'
import { SimpleDialogContainer } from '../../../../components/SimpleModal'

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
 */
export function AppItem(props) {
  const appName = props.appName
  const Content = props.dialogContent
  const [active, setActive] = useState(false)
  const onDoubleClick = function onDoubleClick(e) {
    setActive(true)
    console.log(appName, e)
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
          {appName}
        </div>
      </div>
      <SimpleDialogContainer active={active} appName={appName} close={() => setActive(false)}>
        { Content || '暂无内容' }
      </SimpleDialogContainer>
    </>
  )
}

AppItem.propTypes = {
  appName: PropTypes.string,
  children: PropTypes.element,
  dialogContent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
}
