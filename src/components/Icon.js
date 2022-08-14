import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as AllIcons from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

export function MyIcon(props) {
  const iconName = props.iconName
  const noBubble = props.noBubble !== undefined ? props.noBubble : false
  const onClick = (e) => {
    if (noBubble) {
      e.preventDefault()
      e.stopPropagation()
    }
    props.onClick && props.onClick()
  }
  return (<FontAwesomeIcon icon={AllIcons[iconName]} onClick={(e) => onClick(e)} />)
}
MyIcon.propTypes = {
  iconName: PropTypes.string,
  onClick: PropTypes.func,
  noBubble: PropTypes.bool, // 是否支持冒泡 因为树状图不能冒泡  默认是支持冒泡的
}
