import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export function SuspenseRoute(props) {
  const { path, } = props
  const element = () => (
    <React.Suspense fallback={''}>
      {props.element}
    </React.Suspense>
  )
  return (
    <Route path={path} element={element}></Route>
  )
}
SuspenseRoute.propTypes = {
  element: PropTypes.element,
  path: PropTypes.string,
}
