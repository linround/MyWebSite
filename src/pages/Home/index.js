import React from "react";
import './style.scss'
import {Link} from 'react-router-dom'
import {CustomButton12} from "../cssDemo/buttons";
import ImgProperty from "../cssDemo/imgProperty";
import BounceWebgl from "./bounceWebgl";
import TimeMaskLayer from "./timeMaskLayer";
import DropDownOptions from "../../components/DropDown";
import RippleButton from '../../components/RippleButton'

export default class Home extends React.Component{
  componentDidMount() {
  }
  
  render() {
    return (
      <div className='ly-home-container'>
        <Link to='/LoginPage'>
          <CustomButton12>
            登录
          </CustomButton12>
        </Link>
        <ImgProperty></ImgProperty>
        <RippleButton />
        <TimeMaskLayer></TimeMaskLayer>
        <DropDownOptions></DropDownOptions>
        <BounceWebgl></BounceWebgl>
      </div>
    );
  }
}