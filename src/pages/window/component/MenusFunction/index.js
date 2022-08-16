import React from 'react'
import styles from './styles.less'
import { MyIcon } from '../../../../components/Icon'
import PropTypes from 'prop-types'

export function MenusFunction(props) {
  const onAdd = props.onAdd || (() => {})
  return (
    <div className={styles.MenusFunctionContainer}>
      <div className={styles.MenusFunctionLeft}>
        <div className={styles.MenusFunctionLeftCreateButton} onClick={onAdd}>
          <MyIcon iconName='faCirclePlus' />
          新建
        </div>
      </div>
      <div className={styles.MenusFunctionCenter}>
        支持拖拽文件,移動端不支持排序
      </div>
      <div className={styles.MenusFunctionRight}></div>
    </div>
  )
}


MenusFunction.propTypes = {
  onAdd: PropTypes.func,
}
