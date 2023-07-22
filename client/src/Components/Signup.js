













import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function toLogin() {
    navigate("/login");
  }
  function signup() {
    if (email && username && password) {
      axios
        .post("http://localhost:3005/user/signup", {
          username,
          email,
          password,
        })
        .then(({ data }) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            navigate("/");
          } else {
            alert(data.msg);
          }
        });
    } else {
      alert("enter valid email and password");
    }
  }

  return (
    <div className="generalContainer">
      <div className="generalHeader">
        <h1 className="generalHeading">Breastfeeding.com</h1>
      </div>
      <div className="alignment">
        <input
          className="input"
          type="username"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
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
            signup();
          }}
        >
          Signup
        </button>
        <p className="info-text">
          If you have an account{" "}
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
    </div>
  );
}
export default Signup;



















// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// function Signup() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");

//   function toLogin() {
//     navigate("/login");
//   }
//   function signup() {
//     if (email && username && password) {
//       axios
//         .post("http://localhost:3005/user/signup", {
//           username,
//           email,
//           password,
//         })
//         .then(({ data }) => {
//           if (data.token) {
//             localStorage.setItem("token", data.token);
//             navigate("/");
//           } else {
//             alert(data.msg);
//           }
//         });
//     } else {
//       alert("enter valid email and password");
//     }
//   }

//   return (
//     <div className="generalContainer">
//       <div className="generalHeader">
//         <h1 className="generalHeading">Breastfeeding.com</h1>
//       </div>
//       <div className="alignment">
//         <input
//           className="input"
//           type="username"
//           placeholder="username"
//           onChange={(e) => {
//             setUsername(e.target.value);
//           }}
//         />
//         <input
//           className="input"
//           type="email"
//           placeholder="email"
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//         />
//         <input
//           className="input"
//           type="password"
//           placeholder="password"
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//         />
//         <button
//           className="signup-login-btn"
//           onClick={() => {
//             signup();
//           }}
//         >
//           Signup
//         </button>
//         <p className="info-text">
//           If you have an account{" "}
//           <a
//             className="signup-login-anchor"
//             onClick={() => {
//               toLogin();
//             }}
//           >
//             {" "}
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
// export default Signup;





// import { useNavigate, Link } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// function Signup() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   function toLogin() {
//     navigate("/");
//   }

//   function signup() {
//     axios
//       .post("http://localhost:3005/user/signup", {
//         email,
//         password,
//       })
//       .then((response) => {
//         if (response.data.token) {
//           localStorage.setItem("token", response.data.token);
//           console.log("Token Saved in local storage");
//           navigate("/comments");
//         } else {
//           alert("Enter valid email and password");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
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
//         <button className="signup-login-btn" onClick={signup}>
//           Signup
//         </button>
//       </div>
//       <p className="info-text">
//         If you have an account{" "}
//         <Link to="/" className="signup-login-anchor">
//           Login
//         </Link>
//       </p>
//     </div>
//   );
// }

// export default Signup;



