import React, { useState } from 'react'
import styles from './styles.less'
import { DropDownMenu } from '../../dropDownMenu'
import { GithubPros, technologies } from '../MenusData'
import scrollStyles from '../../../style.less'

const BlogFolder = () => {
  const [isOpen, setOpen] = useState(false)
  const None = () => (<></>)
  const handleOpen = () => {
    setOpen(!isOpen)
  }
  const NavTitle = () => (
    <>Blog</>
  )
  // 文件夹的内容列表
  const FolderContent = () => (
    <>
      {technologies.map((menu) => (
        <DropDownMenu key={menu} NavTitle={menu}></DropDownMenu>
      ))}
    </>
  )


  return (
    <div>
      <DropDownMenu
        isFolder
        isOpen
        NavTitle={<NavTitle />}
        directionIcon={isOpen ? 'faAngleDown' : 'faAngleRight'}
        handleOpen={handleOpen}>
        {isOpen ? <FolderContent /> : <None />}
      </DropDownMenu>
    </div>
  )
}


const GitHubProFolder = () => {
  const [isOpen, setOpen] = useState(false)
  const None = () => (<></>)
  const handleOpen = () => {
    setOpen(!isOpen)
  }
  // 文件夹的标题
  const NavTitle = () => (
    <>GitHub项目</>
  )


  // 文件夹的内容列表
  const FolderContent = () => (
    <>
      {GithubPros.map((menu) => (
        <DropDownMenu key={menu} NavTitle={menu}></DropDownMenu>
      ))}
    </>
  )
  return (
    <div>
      <DropDownMenu
        isFolder
        isOpen
        NavTitle={<NavTitle />}
        directionIcon={isOpen ? 'faAngleDown' : 'faAngleRight'}
        handleOpen={handleOpen}>
        {isOpen ? <FolderContent /> : <None />}
      </DropDownMenu>
    </div>
  )
}



export function FolderTree() {
  return (
    <div className={`${styles.FolderTreeContainer} ${scrollStyles.ScrollStyle}`}>
      <BlogFolder></BlogFolder>
      <GitHubProFolder></GitHubProFolder>
    </div>
  )
}
