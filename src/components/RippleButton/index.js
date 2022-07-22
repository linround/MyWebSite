import React from 'react'
import './style.scss'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.onRippleButtonClick = this.onRippleButtonClick.bind(this)
  }
  componentDidMount() {

  }
  onRippleButtonClick(e) {
    const rippleButton = e.currentTarget
    function mousePositionToCustomProp(event, element) {
      // 鼠标相对于事件触发元素对象的最表位置
      const posX = event.offsetX
      const posY = event.offsetY
      console.log(element)
      console.log(posX, posY)

      element.style.setProperty('--x', posX + 'px')
      element.style.setProperty('--y', posY + 'px')
    }

    mousePositionToCustomProp(e.nativeEvent, rippleButton)
    rippleButton.classList.add('pulse')
    rippleButton.addEventListener(
      'animationend',
      () => {
        rippleButton.classList.remove('pulse')
      },
      { once: true, }
    )
  }
  render() {
    return (
      <>
        <button className="ripple-button" onClick={this.onRippleButtonClick}>Click me</button>
      </>
    )
  }
}
