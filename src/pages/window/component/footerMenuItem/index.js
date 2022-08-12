import React from 'react'
import styles from './style.less'
import PropTypes from 'prop-types'

export function FooterMenuItem(props) {
  return (
    <div className={styles.footerMenuItemContainer}>
      {props.children}
    </div>
  )
}

FooterMenuItem.propTypes = {
  children: PropTypes.element,
}
