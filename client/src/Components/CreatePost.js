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
            axios
              .post("http://localhost:3005/userProfile/postNew", {
                title: title,
                content: post,
                username: user.username,
                userId: user._id,
                date: date,
              })
              .then(({ data }) => {
                alert(data.msg);
              });
          } else {
            navigate("/"); //go to login
          }
        });
    } else {
      alert("you have to login to create new topic");
      navigate("/"); // go to login
    }
  }

  return (
    <div>
      <label htmlFor="title">Title:</label>
      <textarea
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></textarea>
      <label htmlFor="post">New Post:</label>
      <textarea
        placeholder="New Post"
        value={post}
        onChange={(e) => {
          setPost(e.target.value);
        }}
      ></textarea>
      <button
        onClick={() => {
          submitPost();
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default CreatePost;
