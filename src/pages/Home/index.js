import React from "react";
import {useNavigate} from "react-router-dom";
import {CustomButton12} from "../cssDemo/buttons";
import ImgProperty from "../cssDemo/imgProperty";

import BounceWebgl from "./bounceWebgl";
import TimeMaskLayer from "./timeMaskLayer";

export default function Home() {
  const navigate = useNavigate()
  const handleLogin = ()=>{
    navigate('LoginPage')
  }
  return (
    <div>
      <CustomButton12 onClick={handleLogin}>
        登录
      </CustomButton12>
      <ImgProperty></ImgProperty>
      <TimeMaskLayer></TimeMaskLayer>
      <BounceWebgl></BounceWebgl>
    </div>
  );
}