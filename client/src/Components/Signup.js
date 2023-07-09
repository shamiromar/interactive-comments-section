import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
  
    function toLogin() {
      navigate("/");
    }
      function signup(){
        axios.post("http://localhost:3005/user/signup", {email,password}).then(({ data}) => {
          if(data.token) {
            localStorage.setItem("token",data.token);
            navigate("/comments")
          }else{
            alert(data.msg)
          }
      })
    }
  
    return ( 
      <div className="signup-login-container">
      <h1 className="app-title">Comment Section</h1>
      <div className="input-button-container">
        <input 
        type="email" 
        placeholder="email" 
        onChange = {(e)=>{
          setEmail(e.target.value);
        }}
        />
        <input 
        type="password" 
        placeholder="password"
        onChange = {(e)=>{
          setPassword(e.target.value)
        }}
        />
        <button
        className="signup-login-btn"
         onClick={()=>{
          signup();
        }}>
          Signup</button>
          </div>
        <p className="info-text">
          If you have an account {" "}
          <a
          className="signup-login-anchor"
            onClick={() => {
              toLogin();
            }}
          >
            {" "}
            Login
          </a>
        </p>
      </div>
    );
  }
export default Signup;
