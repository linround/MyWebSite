import React, { useState } from 'react'
import styles from './styles.less'
import scrollStyles from '../../../style.less'
import { FolderItem } from '../../FolderItem'
import PropTypes from 'prop-types'
import classNames from 'classnames'






export function FolderTree(props) {
  const nodes = props.treeNodes
  const onSelected = props.onSelected

  const [dropping, setDropping] = useState(false)
  const onDrop = (ev) => {
    setDropping(false)
    console.log('onDrop', ev.dataTransfer.getData('text'))
  }
  const onDragOver = (ev) => {
    ev.preventDefault()
    setDropping(true)
  }
  const onDragEnter = () => {
    setDropping(true)
    console.log('onDragEnter')
  }
  const onDragLeave = () => {
    setDropping(false)
    console.log('onDragLeave')
  }
  const containerClassName = classNames({
    [styles.FolderTreeContainer]: true,
    [styles.FolderTreeContainerDropping]: dropping,
  })
  return (
    <div className={ containerClassName }
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
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

