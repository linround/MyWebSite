import React from 'react'
import './style/theme.css'
import './style/header.scss'
import { PicCenterOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { userSelector } from '../store/user'
import { UserAvatar } from '../components/userAvatar'
import PropTypes from 'prop-types'

HeaderBar.propTypes = {
  onToggle: PropTypes.func,
}
export function HeaderBar({ onToggle, }) {
  const user = useSelector(userSelector)


  return (
    <div className={'layout-header'} color-scheme={user.theme}>
      <div className='layout-header-left'>
        <PicCenterOutlined onClick={onToggle} />
      </div>
      <div className='layout-header-right'>
        <UserAvatar user={user}></UserAvatar>
      </div>
    </div>
  )
}
