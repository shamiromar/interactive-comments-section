import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";

function CreatePost() {
  const [post, setPost] = useState("");
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  function submitPost() {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3005/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data._id) {
            setUser(data);
            console.log(data._id);
            if (title && post) {
              axios
                .post("http://localhost:3005/userProfile/postNew", {
                  title: title,
                  content: post,
                  username: user.username,
                  userId: user._id,
                  date:
                    date.getDate() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getFullYear() +
                    " " +
                    date.getHours() +
                    ":" +
                    date.getMinutes(),
                })
                .then(({ data }) => {
                  alert(data.msg);
                });
            } else {
              alert("You should have a title and content to post");
            }
          } else {
            navigate("/");
          }
        });
    } else {
      window.alert("you have to login to create new topic");
      navigate("/login"); // go to login
    }
  }

  return (
    <div className="generalContainer">
      <div className="generalHeader">
        <h1 className="generalHeading">Breastfeeding.com</h1>
      </div>
      <div className="alignment">
        <h3 className="headerText">Create a new topic</h3>
        <label htmlFor="title">Title:</label>
        <textarea
          className="postTitle"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></textarea>
        <label htmlFor="post">New Post:</label>
        <textarea
          className="postBody"
          placeholder="New Post"
          value={post}
          onChange={(e) => {
            setPost(e.target.value);
          }}
        ></textarea>
        <button
          className="submitBtn"
          onClick={() => {
            submitPost();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreatePost;



















// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Moment from "react-moment";
// import axios from "axios";

// function CreatePost() {
//   const [post, setPost] = useState("");
//   const [user, setUser] = useState("");
//   const [title, setTitle] = useState("");
//   const navigate = useNavigate();
//   const [date, setDate] = useState(new Date());

//   function submitPost() {
//     if (localStorage.getItem("token")) {
//       axios
//         .post("http://localhost:3005/user/verify", {
//           token: localStorage.getItem("token"),
//         })
//         .then(({ data }) => {
//           if (data._id) {
//             setUser(data);
//             console.log(data._id);
//             if (title && post) {
//               axios
//                 .post("http://localhost:3005/userProfile/postNew", {
//                   title: title,
//                   content: post,
//                   username: user.username,
//                   userId: user._id,
//                   date:
//                     date.getDate() +
//                     "/" +
//                     (date.getMonth() + 1) +
//                     "/" +
//                     date.getFullYear() +
//                     " " +
//                     date.getHours() +
//                     ":" +
//                     date.getMinutes(),
//                 })
//                 .then(({ data }) => {
//                   alert(data.msg);
//                 });
//             } else {
//               alert("You should have a title and content to post");
//             }
//           } else {
//             navigate("/");
//           }
//         });
//     } else {
//       window.alert("you have to login to create new topic");
//       navigate("/login"); // go to login
//     }
//   }

//   return (
//     <div className="generalContainer">
//       <div className="generalHeader">
//         <h1 className="generalHeading">Breastfeeding.com</h1>
//       </div>
//       <div className="alignment">
//         <h3 className="headerText">Create a new topic</h3>
//         <label htmlFor="title">Title:</label>
//         <textarea
//           className="postTitle"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => {
//             setTitle(e.target.value);
//           }}
//         ></textarea>
//         <label htmlFor="post">New Post:</label>
//         <textarea
//           className="postBody"
//           placeholder="New Post"
//           value={post}
//           onChange={(e) => {
//             setPost(e.target.value);
//           }}
//         ></textarea>
//         <button
//           className="submitBtn"
//           onClick={() => {
//             submitPost();
//           }}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CreatePost;
