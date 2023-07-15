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
  const [newComment, setNewComment] = useState({
    title: "",
    content: comment,
    username: "",
    userId: "",
    date: new Date(),
  });

  return (
    <div>
      <textarea
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></textarea>
      <textarea
        placeholder="New Post"
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
