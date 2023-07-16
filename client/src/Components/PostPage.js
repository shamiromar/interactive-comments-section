import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostPage() {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:3005/post/title/" + localStorage.topic)
      .then(({ data }) => {
        console.log(data[0].title);
        setTitle(data[0].title);
        setPost(data[0].content);
        localStorage.removeItem("topic");
      });
  }, []);

  return (
    <div>
      <textarea placeholder="Title" value={title}></textarea>
      <textarea
        value={post}
        onChange={(e) => {
          setPost(e.target.value);
        }}
      ></textarea>
      <label htmlFor="comment"></label>
      <textarea
        placeholder="Comment"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></textarea>
      <button>Submit</button>
      <ul>
        <li>
          comments
          <button>Reply</button>
          <ul>
            <li>reply</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default PostPage;
