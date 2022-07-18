import React, {useState} from "react";
import {AuthProvider,RequireAuth} from "./components/AuthProvider";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import AdminHome from './pages/AdminHome'
import MyLayout from "./layout";
import CSSDemo from './pages/cssDemo'
import LoginPage from "./pages/login";

// css动画相关
import AnimationDemo from "./pages/animationDemo";
import Menus from './pages/menus'
import Demo2 from './pages/demo2'
import Buttons from "./pages/cssDemo/buttons";
import LoginForm from "./pages/login/index";
import {Waves} from "./pages/cssDemo/waves";
import {NavBarDemo} from './pages/cssDemo/navBar'
import {LoginFish} from "./pages/login/fish";
import {P404} from "./pages/P404";

// 可视化相关
import VisualizationDemo from './pages/visualizationDemo'
import ThreeJs from './pages/threeJs'
import Canvas from './pages/canvas'
import Progress from "./pages/progress";

export default function App(){
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
          <Route path='/admin/AnimationDemo' element={<AnimationDemo />}></Route>
          
          
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
        <Route path='/LoginPage' element={<LoginForm />} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<P404 />}></Route>
      </Routes>
    </AuthProvider>
    
  )
}