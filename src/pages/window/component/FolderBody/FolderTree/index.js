import React from 'react'
import styles from './styles.less'
import scrollStyles from '../../../style.less'
import { FolderItem } from '../../FolderItem'
import { blogsSelector, githubSelector } from '../../../../../store/blog'
import { useSelector } from 'react-redux'






export function FolderTree() {
  const blogs = useSelector(blogsSelector)
  const githubPros = useSelector(githubSelector)
  return (
    <div className={styles.FolderTreeContainer}>
      <div className={`${styles.FolderTreeContainerContent} ${scrollStyles.ScrollStyle}`}>
        <FolderItem folderTitle='Blog' folderChildren={blogs}></FolderItem>
        <FolderItem folderTitle='GitHub项目' folderChildren={githubPros}></FolderItem>
      </div>
    </div>
  )
}
