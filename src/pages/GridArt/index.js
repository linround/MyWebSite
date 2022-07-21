import React from "react";
import './style.scss'
import {Link,useNavigate} from 'react-router-dom'

export default function Index (){
  const navigate = useNavigate()
  const handleNavigate = (path)=>{
    navigate(`/common/${path}`)
  }
  return (
    <>
      <div className="grid-art-container">
        <div className="item-1 " onClick={()=> handleNavigate('ComputerBasics')}>
          <span>Computer Basics</span>
          <span className="shop">
            数据结构与算法、
            操作系统(包括操作系统原理、Linux命令行)、
            数据库、
            计算机网络、
            计算机组成原理、
            设计模式
          </span>
          <div className="overlay"></div>
        </div>
        <div className="item-1 alt" onClick={()=> handleNavigate('DatabaseAndOperatingSystem')}>
          <span>Database and Operating System</span>
          <span className="shop">Linux & MySQL </span>
          <div className="overlay"></div>
        </div>
        <div className="item-1 alt" onClick={()=> handleNavigate('NodeJS')}>
          <span>NodeJS</span>
          <span className="shop">
            在 Node.js 之前，JavaScript 只能运行在浏览器中。
            有了 Node.js 以后，JavaScript 就可以脱离浏览器，像其它编程语言一样直接在计算机上使用</span>
          <div className="overlay"></div>
        </div>
        <div className="item-1 " onClick={()=> handleNavigate('Performance')}>
          <span>Performance</span>
          <span className="shop">
            健康网站的性能指标；衡量性能和用户体验；提升网站性能的技术。
          </span>
          <div className="overlay"></div>
        </div>
        <div className="item-1" onClick={()=> handleNavigate('Browser')}>
          <span>Browser</span>
          <span className="shop">一种用于检索并展示万维网信息资源的应用程序</span>
          <div className="overlay"></div>
        </div>
        <div className="item-1 alt" onClick={()=> handleNavigate('ThreeJs')}>
          <span>ThreeJs</span>
          <span className="shop">
            该项目的目的是创建一个易于使用、轻量级、跨浏览器的通用 3D 库。
            当前的构建仅包含 WebGL 渲染器，但示例中也提供了 WebGPU（实验性）、SVG 和 CSS3D 渲染器。
            </span>
          <div className="overlay"></div>
        </div>
        <div className="item-1" onClick={()=> handleNavigate('Components')}>
          <span>Components</span>
          <span className="shop">
            button、dropdown、Radio,Avatar、RippleButton、GeneratePassword and so on
          </span>
          <div className="overlay"></div>
        </div>
        <div className="item-1 alt" onClick={()=> handleNavigate('CSS')}>
          <span>CSS</span>
          <span className="shop">CSS (层叠样式表) 让你可以创建好看的网页，但是它具体是怎么工作的呢？</span>
          <div className="overlay"></div>
        </div>
      </div>
    </>
  )
}