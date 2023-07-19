import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toSignup() {
    navigate("/signup");
  }

  function login() {
    axios
      .post("http://localhost:3005/user/login", { email, password })
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          alert(data.msg);
        }
      });
  }

  return (
    <div className="generalContainer">
      <div className="generalHeader">
        <h1 className="generalHeading">Breastfeeding.com</h1>
      </div>
      <div className="alignment">
        <input
          className="input"
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="input"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="signup-login-btn"
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
        <p className="info-text">
          If you do not have an account{" "}
          <a
            className="signup-login-anchor"
            onClick={() => {
              toSignup();
            }}
          >
            {" "}
            Signup Here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
