import React, {useState} from 'react'
import './style/theme.css'
import './style/sideNav.scss'
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
import {useSelector} from "react-redux";
import {userSelector} from "../store/user";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  PieChartOutlined}  from "@ant-design/icons";

export const menus = [
  {
    
    title: '首页',
    Icon: <MailOutlined/>,
    key: '/'
  },
  {
    title: 'CSS脑洞',
    Icon: <AppstoreOutlined />,
    key: '/CSSDemo',
    subs: [
      {key: '/CSSDemo/Menus', title: 'Menus', Icon: <PieChartOutlined />,},
      {key: '/CSSDemo/Demo2', title: 'Demo2', Icon: <PieChartOutlined />,},
      {key: '/CSSDemo/Buttons', title: 'Buttons', Icon: <PieChartOutlined />,},
      {key: '/CSSDemo/Waves', title: 'Waves', Icon: <PieChartOutlined />,},
      {key: '/CSSDemo/NavBarDemo', title: 'NavBarDemo', Icon: <PieChartOutlined />,},
      {key: '/CSSDemo/LoginFish', title: 'LoginFish', Icon: <PieChartOutlined />,},
    ]
  },
  {
    title: '可视化脑洞',
    Icon: <MenuFoldOutlined />,
    key: '/VisualizationDemo',
    subs: [
      {key: '/VisualizationDemo/ThreeJs', title: 'ThreeJs', Icon: <DesktopOutlined />,},
      {key: '/VisualizationDemo/Canvas', title: 'Canvas', Icon: <DesktopOutlined />,},
    ]
  },
  {
    
    title: '进度条',
    Icon: <MailOutlined/>,
    key: '/Progress'
  },
  {
    title: '动画',
    Icon: <ContainerOutlined />,
    key: '/AnimationDemo'
  },
]

function CustomMenu({menus}) {
  const [state, setState] = useState({
    openKeys: [],
    selectedKeys: []
  })
  const renderMenuItem = ({key, Icon, title,}) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>
          {Icon}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    )
  }
  const renderSubMenu = ({key, Icon, title, subs}) => {
    return (
      <Menu.SubMenu key={key} title={
        <span>{Icon}<span>{title}</span></span>
      }>
        {
          subs && subs.map(item => {
            return item.subs && item.subs.length > 0
              ? renderSubMenu(item)
              : renderMenuItem(item)
          })
        }
      </Menu.SubMenu>
    )
  }
  
  
  const user = useSelector(userSelector)
  const {openKeys, selectedKeys} = state
  const onOpenChange = (openKeys) => {
  
  }
  return (
    <Menu
      theme={user.theme}
      mode='inline'>
      {
        menus && menus.map(item => {
          return item.subs && item.subs.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
        })
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
