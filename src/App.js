import React, {useState} from "react";
import {AuthProvider,RequireAuth} from "./components/AuthProvider";
import {Routes,Route} from "react-router-dom";
import Home from './pages/home'
import MyLayout from "./layout";
import CSSDemo from './pages/cssDemo'
import LoginPage from "./pages/login";

// css动画相关
import AnimationDemo from "./pages/animationDemo";
import Menus from './pages/menus'
import Demo2 from './pages/demo2'
import Buttons from "./pages/cssDemo/buttons";
import LoginForm from "./pages/login/demo";
import {Waves} from "./pages/cssDemo/waves";
import {NavBarDemo} from './pages/cssDemo/navBar'
import {LoginFish} from "./pages/login/fish";

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
          path='/'
          element={
            <RequireAuth>
              <MyLayout />
            </RequireAuth>
          }>
          <Route index element={<Home />}></Route>
          <Route path='/AnimationDemo' element={<AnimationDemo />}></Route>
          
          
          <Route path='/VisualizationDemo' element={<VisualizationDemo />} />
          <Route path='/VisualizationDemo/ThreeJs' element={<ThreeJs />} />
          <Route path='/VisualizationDemo/Canvas' element={<Canvas />} />
          <Route path='/Progress' element={<Progress />} />
          
          
          <Route path='/CSSDemo' element={<CSSDemo />} />
          <Route path='/CSSDemo/Menus' element={<Menus />} />
          <Route path='/CSSDemo/Demo2' element={<Demo2 />} />
          <Route path='/CSSDemo/Buttons' element={<Buttons />} />
          <Route path='/CSSDemo/Waves' element={<Waves />} />
          <Route path='/CSSDemo/NavBarDemo' element={<NavBarDemo />} />
          <Route path='/CSSDemo/LoginFish' element={<LoginFish />} />
        </Route>
        <Route path='/LoginPage' element={<LoginForm />} />
      </Routes>
    </AuthProvider>
    
  )
}