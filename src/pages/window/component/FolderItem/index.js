import React, { useState } from 'react'
import { DropDownMenu } from '../dropDownMenu'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './style.less'
import { useDispatch } from 'react-redux'
import { addBlogItem } from '../../../../store/blog'

export const FolderItem = (props) => {
  const folderTitle = props.folderTitle
  const folderChildren = props.folderChildren || []
  const onSelected = props.onSelected
  const [isOpen, setOpen] = useState(false)
  const None = () => (<></>)
  const handleOpen = () => {
    setOpen(!isOpen)
  }
  const FolderTitle = () => (
    <>{ folderTitle }</>
  )
  // 文件夹的内容列表
  const FolderContent = () => (
    <>
      {folderChildren.map((menu) => (
        <DropDownMenu key={menu} NavTitle={menu}></DropDownMenu>
      ))}
    </>
  )

  const dispatch = useDispatch()
  const [dropping, setDropping] = useState(false)
  const onDrop = (ev, folderKey) => {
    setDropping(false)
    const data = ev.dataTransfer.getData('text')
    dispatch(addBlogItem({
      type: folderKey,
      data: data,
    }))
  }

  // 和推拽有关的事件
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
    [styles.FolderItemContainerDropping]: dropping,
  })
  return (
    <div
      className={containerClassName}
      onDrop={(e) => onDrop(e, folderTitle)}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <DropDownMenu
        isFolder
        isOpen
        onSelected={onSelected}
        itemKey={folderTitle}
        NavTitle={<FolderTitle />}
        directionIcon={isOpen ? 'faAngleDown' : 'faAngleRight'}
        handleOpen={handleOpen}>
        {isOpen ? <FolderContent /> : <None />}
      </DropDownMenu>
    </div>

  )
}

FolderItem.propTypes = {
  folderTitle: PropTypes.string, // 文件夹的名称
  folderChildren: PropTypes.array, // 文件夹的子元素
  onSelected: PropTypes.func, // 选中的节点信息
}
