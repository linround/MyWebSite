import React from 'react'
import styles from './styles.less'
import PropTypes from 'prop-types'
import scrollStyles from '../../../style.less'
import { MyIcon } from '../../../../../components/Icon'

export function FolderItems(props) {
  const items = props.items
  return (
    <div className={`${styles.FolderItemsContainer}  ${scrollStyles.ScrollStyle}`}>
      {items && items.map((item) => (
        <div key={item} className={styles.FolderItemsItem}>
          <div className={styles.FolderItemsItemIcon}>
            <MyIcon iconName='faFolderClosed'></MyIcon>
          </div>
          <div className={styles.FolderItemsItemText}>{item}</div>
        </div>
      ))}
    </div>
  )
}

FolderItems.propTypes = {
  items: PropTypes.array,
}
