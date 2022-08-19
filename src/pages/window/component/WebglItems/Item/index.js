import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './style.less'
import { MyIcon } from '../../../../../components/Icon'

export function Item(props) {
  const to = props.to
  const name = props.name
  return (
    <Link to={to}>
      <div className={styles.ItemContainer}>
        <div className={styles.ItemIcon}>
          <MyIcon iconName='faPaperPlane' />
        </div>
        <div>{ name }</div>
      </div>
    </Link>

  )
}
Item.propTypes = {
  name: PropTypes.string,
  to: PropTypes.string,
}
