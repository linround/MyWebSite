import React from 'react'
import './style/theme.css'
import './style/sideNav.scss'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { userSelector } from '../store/user'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  PieChartOutlined
}  from '@ant-design/icons'


export const menus = [
  {

    title: '首页',
    Icon: <MailOutlined/>,
    key: '/admin',
  },
  {
    title: 'CSS脑洞',
    Icon: <AppstoreOutlined />,
    key: '/admin/CSSDemo',
    subs: [
      { key: '/admin/CSSDemo/Menus', title: 'Menus', Icon: <PieChartOutlined />, },
      { key: '/admin/CSSDemo/Demo2', title: 'Demo2', Icon: <PieChartOutlined />, },
      { key: '/admin/CSSDemo/Buttons', title: 'Buttons', Icon: <PieChartOutlined />, },
      { key: '/admin/CSSDemo/Waves', title: 'Waves', Icon: <PieChartOutlined />, },
      { key: '/admin/CSSDemo/NavBarDemo', title: 'NavBarDemo', Icon: <PieChartOutlined />, },
      { key: '/admin/CSSDemo/LoginFish', title: 'LoginFish', Icon: <PieChartOutlined />, }
    ],
  },
  {
    title: '可视化脑洞',
    Icon: <MenuFoldOutlined />,
    key: '/admin/VisualizationDemo',
    subs: [
      { key: '/admin/VisualizationDemo/ThreeJs', title: 'ThreeJs', Icon: <DesktopOutlined />, },
      { key: '/admin/VisualizationDemo/Canvas', title: 'Canvas', Icon: <DesktopOutlined />, }
    ],
  },
  {

    title: '进度条',
    Icon: <MailOutlined/>,
    key: '/admin/Progress',
  },
  {
    title: '动画',
    Icon: <ContainerOutlined />,
    key: '/admin/AnimationDemo',
  }
]

CustomMenu.propTypes = {
  menus: PropTypes.object,
}
function CustomMenu({ menus, }) {
  const renderMenuItem = ({ key, Icon, title, }) => (
    <Menu.Item key={key}>
      <Link to={key}>
        {Icon}
        <span>{title}</span>
      </Link>
    </Menu.Item>
  )
  const renderSubMenu = ({ key, Icon, title, subs, }) => (
    <Menu.SubMenu key={key} title={
      <span>{Icon}<span>{title}</span></span>
    }>
      {
        subs && subs.map((item) => (item.subs && item.subs.length > 0 ?
          renderSubMenu(item) :
          renderMenuItem(item)))
      }
    </Menu.SubMenu>
  )


  const user = useSelector(userSelector)
  return (
    <Menu
      theme={user.theme}
      mode='inline'>
      {
        menus && menus.map((item) => (item.subs && item.subs.length > 0 ? renderSubMenu(item) : renderMenuItem(item)))
      }
    </Menu>
  )
}

export function SideNav () {
  const user = useSelector(userSelector)
  return (
    <>
      <div className='side-nav-header' color-scheme={user.theme}>
        <div className='side-nav-header-content'>
          前端日常记录
        </div>
      </div>
      <CustomMenu menus={menus} />
    </>
  )
}
