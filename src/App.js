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
import { DragDemo } from './pages/drag'

// css动画相关
const AnimationDemo = React.lazy(() => import('./pages/animationDemo'))
const Menus = React.lazy(() => import('./pages/menus'))
const Demo2 = React.lazy(() => import('./pages/demo2'))
const Buttons = React.lazy(() => import('./pages/cssDemo/buttons'))
const LoginForm = React.lazy(() => import('./pages/login/index'))
const Waves = React.lazy(() => import('./pages/cssDemo/waves'))
const NavBarDemo = React.lazy(() => import('./pages/cssDemo/navBar'))
const LoginFish = React.lazy(() => import('./pages/login/fish'))
const P404 = React.lazy(() => import('./pages/P404'))
const Horse = React.lazy(() => import('./pages/Horse'))
const MobileIndex = React.lazy(() => import('./pages/mobile/index'))
const GridArt = React.lazy(() => import('./pages/GridArt'))

// 公共页面
const CommonLayout = React.lazy(() => import('./CommonLayout/index'))
const CommonComputerBasics = React.lazy(() => import('./pages/common/ComputerBasics'))
const CommonNodeJS = React.lazy(() => import('./pages/common/NodeJS'))
const CommonBrowser = React.lazy(() => import('./pages/common/Browser'))
const CommonCSS = React.lazy(() => import('./pages/common/CSS'))
const CommonPerformance = React.lazy(() => import('./pages/common/Performance'))
const CommonDatabaseAndOperatingSystem = React.lazy(() => import('./pages/common/DatabaseAndOperatingSystem'))
const CommonThreeJs = React.lazy(() => import('./pages/common/ThreeJs'))
const CommonComponents = React.lazy(() => import('./pages/common/Components'))
// 可视化相关
const VisualizationDemo = React.lazy(() => import('./pages/visualizationDemo'))
const ThreeJs = React.lazy(() => import('./pages/threeJs'))
const Canvas = React.lazy(() => import('./pages/canvas'))
const Progress = React.lazy(() => import('./pages/progress'))
const WebglHowItWorks = React.lazy(() => import('./pages/window/WebglHowItWorks/index.js'))
const Webgl = React.lazy(() => import('./pages/window/Webgl'))
const ShadersAndGLSL = React.lazy(() => import('./pages/window/ShadersAndGLSL'))
const WebglImageProcessing = React.lazy(() => import('./pages/window/WebglImageProcessing'))
const WebglImageProcess2 = React.lazy(() => import('./pages/window/webglImageProcess2'))
const Webgl2dTranslation = React.lazy(() => import('./pages/window/webgl2dTranslation'))


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
            element={
              <React.Suspense fallback={<>...</>}><AnimationDemo /></React.Suspense>
            }>
          </Route>

          <Route path='/admin/VisualizationDemo' element={
            <React.Suspense fallback={<>...</>}>
              <VisualizationDemo />
            </React.Suspense>
          } />
          <Route path='/admin/VisualizationDemo/ThreeJs' element={
            <React.Suspense fallback={<>...</>}>
              <ThreeJs />
            </React.Suspense>
          } />
          <Route path='/admin/VisualizationDemo/Canvas' element={
            <React.Suspense fallback={<>...</>}>
              <Canvas />
            </React.Suspense>
          } />
          <Route path='/admin/Progress' element={
            <React.Suspense fallback={<>...</>}>
              <Progress />
            </React.Suspense>
          } />


          <Route path='/admin/CSSDemo' element={<CSSDemo />} />
          <Route path='/admin/CSSDemo/Menus' element={
            <React.Suspense fallback={<>...</>}><Menus /></React.Suspense>} />
          <Route path='/admin/CSSDemo/Demo2' element={
            <React.Suspense fallback={<>...</>}><Demo2 /></React.Suspense>
          }/>
          <Route path='/admin/CSSDemo/Buttons' element={
            <React.Suspense fallback={<>...</>}><Buttons /></React.Suspense>
          } />
          <Route path='/admin/CSSDemo/Waves' element={
            <React.Suspense fallback={<>...</>}><Waves /></React.Suspense>
          } />
          <Route path='/admin/CSSDemo/NavBarDemo' element={
            <React.Suspense fallback={<>...</>}>
              <NavBarDemo />
            </React.Suspense>
          } />
          <Route path='/admin/CSSDemo/LoginFish' element={
            <React.Suspense fallback={<>...</>}>
              <LoginFish />
            </React.Suspense>
          } />
        </Route>
        <Route path='/MobileIndex' element={
          <React.Suspense fallback={<>...</>}>
            <MobileIndex />
          </React.Suspense>} />
        <Route path='/LoginPage' element={
          <React.Suspense fallback={<>...</>}><LoginForm /></React.Suspense>
        } />
        <Route path='/Horse' element={
          <React.Suspense fallback={<>...</>}>
            <Horse />
          </React.Suspense>} />
        <Route path='/Home' element={<Home />} />
        <Route path='/common' element={
          <React.Suspense fallback={<>...</>}>
            <CommonLayout />
          </React.Suspense>}>
          <Route path='/common/ComputerBasics' element={
            <React.Suspense fallback={<>...</>}>
              <CommonComputerBasics />
            </React.Suspense>}></Route>
          <Route path='/common/NodeJS' element={
            <React.Suspense fallback={<>...</>}>
              <CommonNodeJS />
            </React.Suspense>}></Route>
          <Route path='/common/Browser' element={
            <React.Suspense fallback={<>...</>}>
              <CommonBrowser />
            </React.Suspense>}></Route>
          <Route path='/common/CSS' element={
            <React.Suspense fallback={<>...</>}>
              <CommonCSS />
            </React.Suspense>
          }></Route>
          <Route path='/common/Performance' element={
            <React.Suspense fallback={<>...</>}>
              <CommonPerformance />
            </React.Suspense>
          }></Route>
          <Route path='/common/DatabaseAndOperatingSystem' element={
            <React.Suspense fallback={<>...</>}>
              <CommonDatabaseAndOperatingSystem />
            </React.Suspense>
          }></Route>


          <Route path='/common/ThreeJs' element={
            <React.Suspense fallback={<>...</>}>
              <CommonThreeJs />
            </React.Suspense>
          }></Route>
          <Route path='/common/Components' element={
            <React.Suspense fallback={<>...</>}>
              <CommonComponents />
            </React.Suspense>
          }></Route>
        </Route>
        <Route path='/GridArt' element={
          <React.Suspense fallback={<>...</>}>
            <GridArt />
          </React.Suspense>} />
        <Route path='/MacModal' element={<MacModal />} />
        <Route path='/DragDemo' element={<DragDemo />} />
        <Route path='/Webgl' element={
          <React.Suspense fallback={<>...</>}>
            <Webgl />
          </React.Suspense>
        } />

        <Route path='/Webgl2dTranslation' element={
          <React.Suspense fallback={<>...</>}>
            <Webgl2dTranslation />
          </React.Suspense>
        }></Route>
        <Route path='/WebglImageProcess2' element={
          <React.Suspense fallback={<>...</>}>
            <WebglImageProcess2 />
          </React.Suspense>
        }></Route>
        <Route path='/WebglHowItWorks' element={
          <React.Suspense fallback={<>...</>}><WebglHowItWorks /></React.Suspense>
        } />
        <Route path='/WebglImageProcessing' element={
          <React.Suspense fallback={<>...</>}>
            <WebglImageProcessing />
          </React.Suspense>
        } />
        <Route path='/ShadersAndGLSL' element={
          <React.Suspense fallback={<>...</>}>
            <ShadersAndGLSL />
          </React.Suspense>
        } />
        <Route path='/BasicReactSortable' element={<BasicReactSortable />} />
        <Route path='/FaIcons' element={<FaIcons />} />
        <Route path='/' element={<WindowPage />}></Route>
        <Route path='*' element={
          <React.Suspense fallback={<>...</>}>
            <P404 />
          </React.Suspense>
        }></Route>
      </Routes>
    </AuthProvider>

  )
}
