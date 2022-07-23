import React from 'react'
import styles from './style.less'
import PropTypes from 'prop-types'

export function AppItem(props) {
  const appName = props.appName
  return (
    <div className={styles.appItemContainer}>
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
