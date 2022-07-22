import './style.css'
import React from 'react'
import PropTypes from 'prop-types'

CustomButton1.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton2.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton3.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton4.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton5.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton6.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton7.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton8.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton9.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton10.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton11.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton12.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton13.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton14.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton15.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
CustomButton16.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
}
export function CustomButton1({ onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-1'} onClick={onClick}>
      {children ? children : 'btn1'}
    </button>
  )
}

export function CustomButton2({ onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-2'} onClick={onClick}>
      <span>{children ? children : 'btn2'}</span>
    </button>
  )
}

export function CustomButton3({ onClick, children, }) {

  return (
    <button className={'ly-custom-btn btn-3'} onClick={onClick}>
      <span>{children ? children : 'btn-3'}</span>
    </button>
  )
}

export function CustomButton4({  onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-4'} onClick={onClick}>
      <span>{children ? children : 'btn4'}</span>
    </button>
  )
}

export function CustomButton5({  onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-5'} onClick={onClick}>
      <span>{children ? children : 'btn5'}</span>
    </button>
  )
}

export function CustomButton6({  onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-6'} onClick={onClick}>
      <span>{children ? children : 'btn6'}</span>
    </button>
  )
}

export function CustomButton7({  onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-7'} onClick={onClick}>
      <span>{children ? children : 'btn7'}</span>
    </button>
  )
}

export function CustomButton8({  onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-8'} onClick={onClick}>
      <span>{children ? children : 'btn8'}</span>
    </button>
  )
}
export function CustomButton9({  onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-9'} onClick={onClick}>
      {children ? children : 'btn9'}
    </button>
  )
}
export function CustomButton10({  onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-10'} onClick={onClick}>
      {children ? children : 'btn10'}
    </button>
  )
}
export function CustomButton11({  onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-11'} onClick={onClick}>
      {children ? children : 'btn11'}
      <div className="dot"></div>
    </button>
  )
}
export function CustomButton12({  onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-12'} onClick={onClick}>
      <span>{children ? children : 'Click btn12'}</span><span>
        {children ? children : 'Click btn12'}
      </span>
    </button>
  )
}
export function CustomButton13({  onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-13'} onClick={onClick}>
      {children ? children : 'btn13'}
    </button>
  )
}
export function CustomButton14({  onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-14'} onClick={onClick}>
      {children ? children : 'btn14'}
    </button>
  )
}
export function CustomButton15({  onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-15'} onClick={onClick}>
      {children ? children : 'btn15'}
    </button>
  )
}
export function CustomButton16({  onClick, children, }) {
  return (
    <button className={'ly-custom-btn btn-16'} onClick={onClick}>
      {children ? children : 'btn16'}
    </button>
  )
}









export default function Buttons() {
  return (
    <>
      <h1>Animation Buttons</h1>
      <p>Hover us and enjoy the satisfying neumorphic animation designs!</p>
      <div className="frame">
        <CustomButton1></CustomButton1>
        <CustomButton2></CustomButton2>
        <CustomButton3></CustomButton3>
        <CustomButton4></CustomButton4>
        <CustomButton5></CustomButton5>
        <CustomButton6></CustomButton6>
        <CustomButton7></CustomButton7>
        <CustomButton8></CustomButton8>
        <CustomButton9></CustomButton9>
        <CustomButton10></CustomButton10>
        <CustomButton11></CustomButton11>
        <CustomButton12></CustomButton12>
        <CustomButton13></CustomButton13>
        <CustomButton14></CustomButton14>
        <CustomButton15></CustomButton15>
        <CustomButton16></CustomButton16>
      </div>

    </>
  )
}

