import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as AllIcons from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

export function MyIcon(props) {
  const iconName = props.iconName
  const onClick = props.onClick || (() => {})
  return (<FontAwesomeIcon icon={AllIcons[iconName]} onClick={() => onClick()} />)
}
MyIcon.propTypes = {
  iconName: PropTypes.string,
  onClick: PropTypes.func,
}
