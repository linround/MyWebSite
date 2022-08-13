import React from 'react'
import styles from './styles.less'
import { PlusCircleOutlined } from '@ant-design/icons'

export function MenusFunction() {
  return (
    <div className={styles.MenusFunctionContainer}>
      <div className={styles.MenusFunctionLeft}>
        <div className={styles.MenusFunctionLeftCreateButton}>
          <PlusCircleOutlined />
          新建
        </div>
      </div>
      <div className={styles.MenusFunctionCenter}></div>
      <div className={styles.MenusFunctionRight}></div>
    </div>
  )
}
