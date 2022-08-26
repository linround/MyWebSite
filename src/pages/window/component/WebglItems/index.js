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
        <Item to='WebglImageProcessing' name='WebglImageProcessing' />
        <Item to='WebglImageProcess2' name='WebglImageProcess2' />
        <Item to='Webgl2dTranslation' name='Webgl2dTranslation' />
        <Item to='Webgl2dRotation' name='Webgl2dRotation' />
        <Item to='Webgl2dMatrices' name='Webgl2dMatrices' />
      </div>
    </>
  )
}
