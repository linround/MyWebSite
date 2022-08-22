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
      </div>
    </>
  )
}
