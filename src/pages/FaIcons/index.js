import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as AllIcons from '@fortawesome/free-solid-svg-icons'


export function FaIcons() {
  return (
    <>
      {
        Object.keys(AllIcons)
          .map((icon) => <FontAwesomeIcon title={icon} key={icon} icon={AllIcons[icon]}></FontAwesomeIcon>)
      }</>
  )
}
