import React from 'react'
import { Item } from './Item'
import styles from './style.less'
export function ComponentsItems() {
  return (
    <>
      <div className={styles.ComponentsItemsContainer}>
        <Item to='Webgl' name='button' />
      </div>
    </>
  )
}
