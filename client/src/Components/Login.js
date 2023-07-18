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
          navigate("/topicTable");
        } else {
          alert(data.msg);
        }
      });
  }

  return (
    <div className="signup-login-container">
      <h1 className="app-title">Comment Section</h1>
      <div className="input-button-container">
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
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
      </div>
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
  );
}

export default Login;




// import { useNavigate, Link } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   function toSignup() {
//     navigate("/signup");
//   }

//   function login() {
//     if (email && password) {
//       axios
//         .post("http://localhost:3005/user/login", {
//           email,
//           password,
//         })
//         .then(({ data }) => {
//           console.log(data);
//           if (data.token) {
//             localStorage.setItem("token", data.token);
//             navigate("/comments");
//           } else {
//             alert(data.msg);
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       alert("Enter email and password");
//     }
//   }

//   return (
//     <div className="signup-login-container">
//       <h1 className="app-title">Comment Section</h1>
//       <div className="input-button-container">
//         <input
//           type="email"
//           placeholder="email"
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//         />
//         <input
//           type="password"
//           placeholder="password"
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//         />
//         <button className="signup-login-btn" onClick={login}>
//           Login
//         </button>
//       </div>
//       <p className="info-text">
//         If you do not have an account{" "}
//         <Link to="/signup" className="signup-login-anchor">
//           Signup Here
//         </Link>
//       </p>
//     </div>
//   );
// }

// export default Login;





