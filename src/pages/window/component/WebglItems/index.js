import React from 'react'
import { Item } from './Item'
import styles from './style.less'
export function WebglItems() {
  return (
    <>
      <div className={styles.ComponentsItemsContainer}>
        <Item to='Webgl' name='Webgl基础' />
        <Item to='WebglHowItWorks' name='Webgl原理' />
        <Item to='ShadersAndGLSL' name='ShadersAndGLSL' />
        <Item to='WebglImageProcessing' name='图像处理2' />
        <Item to='WebglImageProcess2' name='图像处理1' />
        <Item to='Webgl2dTranslation' name='2D平移' />
        <Item to='Webgl2dRotation' name='2D旋转' />
        <Item to='Webgl2dMatrices' name='2D矩阵' />
        <Item to='Webgl3dOrthographic' name='3D正交投影' />
        <Item to='Webgl3dPerspective' name='3D透视投影' />
        <Item to='Webgl3dCamera' name='3D相机' />
        <Item to='Webgl3dLightingDirectional' name='光照相关' />
      </div>
    </>
  )
}
