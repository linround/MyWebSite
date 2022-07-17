import React from "react";
import './style/theme.css'
import './style/header.scss'
import {PicCenterOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useSelector,useDispatch} from "react-redux";
import {userSelector, toggleTheme} from "../store/user";
import {UserAvatar} from "../components/userAvatar";

export function HeaderBar({onToggle}){
  const user = useSelector(userSelector)
  const dispatch = useDispatch()
  const onToggleTheme = () => {
    dispatch(toggleTheme({
      name: user.name,
      theme: user.theme === 'dark' ? 'light' : 'dark'
    }))
  }
  
  
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