import React  from 'react'
import styles from './styles.less'
import scrollStyles from '../../../style.less'
import { FolderItem } from '../../FolderItem'
import PropTypes from 'prop-types'






export function FolderTree(props) {
  const nodes = props.treeNodes
  const onSelected = props.onSelected


  return (
    <div className={ styles.FolderTreeContainer }>
      <div className={`${styles.FolderTreeContainerContent} ${scrollStyles.ScrollStyle}`}>
        {nodes.map((node) => (
          <FolderItem
            key={node.title}
            onSelected={onSelected}
            folderTitle={node.title}
            folderChildren={node.children}
          />
        ))}
      </div>
    </div>
  )
}

FolderTree.propTypes = {
  treeNodes: PropTypes.array, // 节点树
  onSelected: PropTypes.func, // 返回选中的节点信息
}

