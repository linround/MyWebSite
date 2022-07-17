import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {signIn} from "../../store/user";
import {useDispatch} from "react-redux";

export default function LoginPage(){
  const navigate = useNavigate()
  const loaction = useLocation()
  const dispatch = useDispatch()
  const from = loaction.state?.from?.pathname || "/"
  const handleSubmit = (event)=>{
    const formData = new FormData(event.currentTarget)
    const username = formData.get("username")
  
    dispatch(signIn(
      username
    ))
    navigate(from, { replace: true });
  }
  return (
    <div>
      <p>You must log in to view the page at {from}</p>
      
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}