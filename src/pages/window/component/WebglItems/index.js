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
        <Item to='Webgl3dLightingDirectional' name='方向光源' />
        <Item to='Webgl3dLightingPoint' name='点光源' />
        <Item to='WebglLessCodeMoreFun' name='渲染多个' />
        <Item to='Webgl3dTextures' name=' 纹理' />
        <Item to='Webgl3dTexturesRepeat' name=' 纹理重复' />
        <Item to='Webgl3dTexturesMipmap' name=' 纹理插值' />
        <Item to='Webgl3dTexturesMipmap2' name=' 纹理插值2' />
        <Item to='Webgl3dTexturesMipmap3' name=' 纹理插值3' />
        <Item to='WebglDataTextures' name=' 数据纹理' />
      </div>
    </>
  )
}
