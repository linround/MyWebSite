import React from 'react'
import './style.scss'
import {
  Popover, Button, Avatar
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import {  useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleTheme, signOut } from '../../store/user'
import PropTypes from 'prop-types'

UserAvatar.propTypes = {
  user: PropTypes.object,
}
export function UserAvatar({ user, }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleToggleTheme = () => {
    dispatch(toggleTheme({
      name: user.name,
      theme: user.theme === 'dark' ? 'light' : 'dark',
    }))
  }
  const handleSignOut = () => {
    dispatch(signOut())
    navigate('/LoginPage', { replace: true, })

  }
  const avatar = <Avatar shape="square"  icon={<UserOutlined />} />
  const Content = () => (
    <>
      <div className='user-avatar-name'>{user.name}</div>
      <Button block onClick={handleToggleTheme}>切换主题</Button>
      <Button block onClick={handleSignOut}>退出登录</Button>
    </>
  )
  return (
    <Popover placement="bottomRight" content={Content} trigger="hover">
      {avatar}
    </Popover>
  )
}
