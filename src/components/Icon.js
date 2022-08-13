import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as AllIcons from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

export function MyIcon(props) {
  const iconName = props.iconName
  return (<FontAwesomeIcon icon={AllIcons[iconName]} />)
}
MyIcon.propTypes = {
  iconName: PropTypes.string,
}
