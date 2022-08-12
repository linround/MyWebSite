import React from 'react'
import styles from './style.less'
import PropTypes from 'prop-types'

export function AppItem(props) {
  const appName = props.appName
  const onDoubleClick = function onDoubleClick(e) {
    console.log(appName, e)
  }
  const onContextMenu = function onContextMenu(e) {
    e.preventDefault()
    console.log(appName, e)
  }
  return (
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
  )
}

AppItem.propTypes = {
  appName: PropTypes.string,
  children: PropTypes.element,
}
