import React from 'react'
import styles from './styles.less'
import PropTypes from 'prop-types'

export function FolderItems(props) {
  const items = props.items
  return (
    <div className={styles.FolderItemsContainer}>
      {items && items.map((item) => (
        item
      ))}
    </div>
  )
}

FolderItems.propTypes = {
  items: PropTypes.array,
}
