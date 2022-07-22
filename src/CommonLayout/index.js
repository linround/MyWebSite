import React from 'react'
import { Outlet } from 'react-router-dom'
import FeaturesButton from '../components/FeaturesButton/index'


export default class Index extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <>
        <FeaturesButton />
        <Outlet />
      </>
    )
  }
}
