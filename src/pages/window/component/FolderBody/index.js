import React from 'react'
import { FolderTree } from './FolderTree'
import { FolderItems } from './FolderItems'
import styles from './styles.less'

export function FolderBody() {
  return (
    <div className={styles.folderBodyContainer}>
      <FolderTree />
      <FolderItems />
    </div>
  )
}
