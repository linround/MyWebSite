import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

export default function Index ({ handleSearch = (() => ({})), }) {
  const navigate = useNavigate()
  const handleNavigate = (path) => {
    navigate(path)
  }
  return (
    <div className='features-button-container'>
      <input className="features-button-menu-checkbox" id="features-button-menu" type="checkbox" name="features-button-menu"/>
      <nav className="features-button-menu">
        <label className="features-button-menu-dots" htmlFor="features-button-menu">
          <span className="features-button-menu-dot"></span>
          <span className="features-button-menu-dot"></span>
          <span className="features-button-menu-dot"></span>
        </label>
        <ul className="features-button-menu-items">
          <li className="features-button-menu-item" onClick={() => handleNavigate('/')}>
            主页
          </li>
          <li className="features-button-menu-item" onClick={() => handleNavigate('/admin')}>
            管理
          </li>
          <li className="features-button-menu-item" onClick={() => handleNavigate('/LoginPage')}>
            登录
          </li>
          <li className="features-button-menu-item" onClick={() => handleSearch()}>
            搜索
          </li>
        </ul>
        <label htmlFor="features-button-menu" className="features-button-menu-closer-overlay"></label>
      </nav>
    </div>
  )
}
Index.propTypes = {
  handleSearch: PropTypes.func,
}
