import React from 'react'
import { CustomButton12 } from './buttons'


export default function ImgProperty() {
  const objectFit = 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit'
  const onClick = () => {
    window.open(objectFit, '_target')
  }
  return (
    <CustomButton12 onClick={onClick}>
      objectFit
    </CustomButton12>
  )
}
