import React from 'react'
import { AuthProvider, RequireAuth } from './components/AuthProvider'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminHome from './pages/AdminHome'
import MyLayout from './layout'
import CSSDemo from './pages/cssDemo'
import { WindowPage } from './pages/window'
import { MacModal } from './pages/macModal'
import { FaIcons } from './pages/FaIcons'
import { BasicReactSortable } from './pages/ReactSortable'

// css动画相关
import AnimationDemo from './pages/animationDemo'
import Menus from './pages/menus'
import Demo2 from './pages/demo2'
import Buttons from './pages/cssDemo/buttons'
import LoginForm from './pages/login/index'
import { Waves } from './pages/cssDemo/waves'
import { NavBarDemo } from './pages/cssDemo/navBar'
import { LoginFish } from './pages/login/fish'
import { P404 } from './pages/P404'
import Horse from './pages/Horse'
import MobileIndex from './pages/mobile/index'
import GridArt from './pages/GridArt'

// 公共页面
import CommonLayout from './CommonLayout/index'
import CommonComputerBasics from './pages/common/ComputerBasics'
import CommonNodeJS from './pages/common/NodeJS'
import CommonBrowser from './pages/common/Browser'
import CommonCSS from './pages/common/CSS'
import CommonPerformance from './pages/common/Performance'
import CommonDatabaseAndOperatingSystem from './pages/common/DatabaseAndOperatingSystem'
import CommonThreeJs from './pages/common/ThreeJs'
import CommonComponents from './pages/common/Components'

// 可视化相关
import VisualizationDemo from './pages/visualizationDemo'
import ThreeJs from './pages/threeJs'
import Canvas from './pages/canvas'
import Progress from './pages/progress'


export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path='/admin'
          element={
            <RequireAuth>
              <MyLayout />
            </RequireAuth>
          }>
          <Route index element={<AdminHome />}></Route>
          <Route
            path='/admin/AnimationDemo'
            element={<AnimationDemo />}>
          </Route>

          <Route path='/admin/VisualizationDemo' element={<VisualizationDemo />} />
          <Route path='/admin/VisualizationDemo/ThreeJs' element={<ThreeJs />} />
          <Route path='/admin/VisualizationDemo/Canvas' element={<Canvas />} />
          <Route path='/admin/Progress' element={<Progress />} />


          <Route path='/admin/CSSDemo' element={<CSSDemo />} />
          <Route path='/admin/CSSDemo/Menus' element={<Menus />} />
          <Route path='/admin/CSSDemo/Demo2' element={<Demo2 />} />
          <Route path='/admin/CSSDemo/Buttons' element={<Buttons />} />
          <Route path='/admin/CSSDemo/Waves' element={<Waves />} />
          <Route path='/admin/CSSDemo/NavBarDemo' element={<NavBarDemo />} />
          <Route path='/admin/CSSDemo/LoginFish' element={<LoginFish />} />
        </Route>
        <Route path='/MobileIndex' element={<MobileIndex />} />
        <Route path='/LoginPage' element={<LoginForm />} />
        <Route path='/Horse' element={<Horse />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/common' element={<CommonLayout />}>
          <Route path='/common/ComputerBasics' element={<CommonComputerBasics />}></Route>
          <Route path='/common/NodeJS' element={<CommonNodeJS />}></Route>
          <Route path='/common/Browser' element={<CommonBrowser />}></Route>
          <Route path='/common/CSS' element={<CommonCSS />}></Route>
          <Route path='/common/Performance' element={<CommonPerformance />}></Route>
          <Route path='/common/DatabaseAndOperatingSystem' element={<CommonDatabaseAndOperatingSystem />}></Route>
          <Route path='/common/ThreeJs' element={<CommonThreeJs />}></Route>
          <Route path='/common/Components' element={<CommonComponents />}></Route>
        </Route>
        <Route path='/GridArt' element={<GridArt />} />
        <Route path='/MacModal' element={<MacModal />} />
        <Route path='/BasicReactSortable' element={<BasicReactSortable />} />
        <Route path='/FaIcons' element={<FaIcons />} />
        <Route path='/' element={<WindowPage />}></Route>
        <Route path='*' element={<P404 />}></Route>
      </Routes>
    </AuthProvider>

  )
}
