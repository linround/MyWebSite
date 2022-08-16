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
  const wait = 1000 / 60 // 为了使得拖拽时的帧的流畅度 取30帧即可满足流畅问题 等待超过这个时间节点才会执行
  let enterStartTime = 0 // 记录下 进入的时间点
  const onDragOver = (ev) => {
    ev.preventDefault()
    setDropping(true)
  }
  const onDragEnter = () => {
    setDropping(true)
    enterStartTime = Date.now()
  }
  const onDragLeave = () => {
    const distance = Date.now() - enterStartTime
    if (distance < wait) return
    setDropping(false)
  }
  const containerClassName = classNames({
    [styles.FolderItemContainerDropping]: dropping,
  })


  return (
    <div
      onDrop={(e) => onDrop(e, folderTitle)}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      className={containerClassName}
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
