import React from "react";
import {Link} from 'react-router-dom'
import {CustomButton12} from "../cssDemo/buttons";
import ImgProperty from "../cssDemo/imgProperty";

import BounceWebgl from "./bounceWebgl";
import TimeMaskLayer from "./timeMaskLayer";

export default class Home extends React.Component{
  componentDidMount() {
  }
  
  render() {
    return (
      <div>
        <Link to='/LoginPage'>
          <CustomButton12>
            登录
          </CustomButton12>
        </Link>
        <ImgProperty></ImgProperty>
        <TimeMaskLayer></TimeMaskLayer>
        <BounceWebgl></BounceWebgl>
      </div>
    );
  }
}