import React from 'react'
import styles from './style.less'
import PropTypes from 'prop-types'
import { MyIcon } from '../../../../components/Icon'

const DefaultNav = () => (
  <>无标题</>
)

export function DropDownMenu(props) {
  const directionIcon = props.directionIcon
  const handleOpen = props.handleOpen || (() => {})
  const isFolder = props.isFolder || false
  const titleIcon = props.titleIcon || 'faFolderBlank'
  return (
    <div className={styles.DropDownMenuContainer}>
      <div className={styles.DropDownMenuTitle}>
        {isFolder ? <MyIcon iconName={directionIcon} onClick={handleOpen}></MyIcon> : ''}
        {<MyIcon iconName={titleIcon} />}
        {props.NavTitle || <DefaultNav /> }
      </div>
      {
        props.children && (
          <div className={styles.DropDownMenuContent}>
            { props.children}
          </div>
        )
      }
    </div>
  )
}

DropDownMenu.propTypes = {
  NavTitle: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]), // 文件夹的标题
  children: PropTypes.element, // 文件夹里面的子文件内容


  titleIcon: PropTypes.string, // 标题前的图标
  directionIcon: PropTypes.string, // 文件夹的方向图标
  handleOpen: PropTypes.func, // 切换打开该文件夹起
  isFolder: PropTypes.bool, // 是否文件夹（文件夹具有可折叠的方向图标）
  isOpen: PropTypes.bool, // 是否打开
}

