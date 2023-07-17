import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";

function PostPage() {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [date, setDate] = useState(new Date());
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState("");
  const [newReply, setNewReply] = useState({
    content: reply,
    username: user.username,
    userId: user._id,
    date: new Date(),
    commentId: comments._id,
  });

  function submitComment() {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3005/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          console.log(data);
          if (data._id) {
            setUser(data);
            console.log({
              title: localStorage.topic,
              content: comment,
              username: user.username,
              userId: user._id,
              date: new Date(),
            });
            axios
              .post("http://localhost:3005/comment/new", {
                title: localStorage.topic,
                content: comment,
                username: user.username,
                userId: user._id,
                date: new Date(),
              })
              .then(({ data }) => {
                alert(data.msg);
                //window.location.reload(false);
              });
          } else {
            console.log("wrong");
            navigate("/topicTable"); //go to login
          }
        });
    } else {
      window.alert("you have to login to make a comment");
      navigate("/login"); // go to login
    }
  }

  /*function replyOnComment() {
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
              .post("http://localhost:3005/reply", newReply)
              .then(({ data }) => {
                console.log(newReply);
                alert(data.msg);
                //window.location.reload(false);
              });
          } else {
            navigate("/"); //go to login
          }
        });
    } else {
      window.alert("you have to login to reply");
      navigate("/login"); // go to login
    }
  }*/

  useEffect(() => {
    if (localStorage.topic) {
      axios
        .get("http://localhost:3005/post/title/" + localStorage.topic)
        .then(({ data }) => {
          console.log(data[0].title);
          setTitle(data[0].title);
          setPost(data[0].content);
          axios
            .get("http://localhost:3005/comment/title/" + localStorage.topic)
            .then(({ data }) => {
              if (data) {
                console.log(data);
                setComments(data);
              }
            });

          /*axios
            .get("http://localhost:3005/comment/title/" + localStorage.topic)
            .then(({ data }) => {
              console.log(data);
              if (data) {
                console.log(data);
                setComments(data);
                axios
                  .get("http://localhost:3005/reply/" + res._id)
                  .then(({ reply }) => {
                    if (reply) {
                      setReplies(reply);
                    }
                  });
              }
            });*/
        });
    } else {
      navigate("/topicTable");
    }
    //localStorage.removeItem("topic");
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
      <button
        onClick={() => {
          submitComment();
        }}
      >
        Submit
      </button>
      <div>
        <ul>
          {comments.map((comments) => {
            return (
              <div>
                <li>
                  {comments.username}
                  {comments.content}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PostPage;

/*{comments.map((comments) => {
            return (
              <div>
                <li>
                  {comments.username}
                  {comments.content}
                  {Moment(comments.date).format("MMMM DD YYYY, h:mm:ss a")}
                  <div>
                    <textarea
                      placeholder="Reply"
                      value={reply}
                      onChange={(e) => {
                        setReply(e.target.value);
                      }}
                    ></textarea>
                    <button
                      onClick={() => {
                        replyOnComment();
                      }}
                    >
                      Reply
                    </button>
                  </div>
                  <ul>
                    {replies.map((reply) => {
                      return (
                        <div>
                          <li>
                            {reply.username}
                            {reply.content}
                            {Moment(reply.date).format(
                              "MMMM DD YYYY, h:mm:ss a"
                            )}
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                </li>
              </div>
            );
          })}*/
