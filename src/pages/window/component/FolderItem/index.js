import React, { useState } from 'react'
import { DropDownMenu } from '../dropDownMenu'
import PropTypes from 'prop-types'


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


  return (
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
  )
}

FolderItem.propTypes = {
  folderTitle: PropTypes.string, // 文件夹的名称
  folderChildren: PropTypes.array, // 文件夹的子元素
  onSelected: PropTypes.func, // 选中的节点信息
}
