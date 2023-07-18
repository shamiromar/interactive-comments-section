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
  const [postUserId, setPostUserId] = useState("");
  const [postId, setPostId] = useState("");

  function submitComment() {
    if (localStorage.token) {
      axios
        .post("http://localhost:3005/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          console.log(data);
          if (data._id) {
            setUser(data);
            if (comment) {
              axios
                .post("http://localhost:3005/comment/new", {
                  title: localStorage.topic,
                  content: comment,
                  username: data.username,
                  userId: data._id,
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
                  window.location.reload(false);
                });
            } else {
              alert("Add content to your comment");
            }
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

  function deleteComment(commentId, commentUserId) {
    if (localStorage.token) {
      axios
        .post("http://localhost:3005/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          console.log(data);
          if (data._id) {
            setUser(data);
            if (data._id === commentUserId) {
              const shouldDelete = window.confirm(
                "Are you sure you want to delete this comment?"
              );
              if (shouldDelete) {
                axios
                  .delete("http://localhost:3005/comment/delete/" + commentId)
                  .then(({ data }) => {
                    alert(data.msg);
                    window.location.reload(false);
                  });
              }
            } else {
              alert("You can't delete this comment");
            }
          }
        });
    } else {
      alert("Login to delete comment");
    }
  }

  function editComment(commentId, commentUserId) {
    if (localStorage.token) {
      axios
        .post("http://localhost:3005/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          console.log(data);
          if (data._id) {
            setUser(data);
            if (data._id === commentUserId) {
              if (comment) {
                axios
                  .put("http://localhost:3005/comment/edit/" + commentId, {
                    title: localStorage.topic,
                    content: comment,
                    username: data.username,
                    userId: data._id,
                  })
                  .then(({ data }) => {
                    alert(data.msg);
                    window.location.reload(false);
                  });
              }
            } else {
              alert("You can't edit this comment");
            }
          }
        });
    } else {
      alert("Login to edit comment");
    }
  }

  function editPost() {
    if (localStorage.token) {
      axios
        .post("http://localhost:3005/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          console.log(data);
          if (data._id) {
            setUser(data);
            if (data._id === postUserId) {
              if (post) {
                axios
                  .put("http://localhost:3005/userProfile/edit/" + postId, {
                    title: title,
                    content: post,
                    username: data.username,
                    userId: data._id,
                  })
                  .then(({ data }) => {
                    alert(data.msg);
                    window.location.reload(false);
                  });
              }
            } else {
              alert("You can't edit this post");
            }
          }
        });
    } else {
      alert("Login to edit post");
    }
  }

  function deletePost() {
    if (localStorage.token) {
      axios
        .post("http://localhost:3005/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          console.log(data);
          if (data._id) {
            setUser(data);
            if (data._id === postUserId) {
              const shouldDelete = window.confirm(
                "Are you sure you want to delete this comment?"
              );
              if (shouldDelete) {
                axios
                  .put("http://localhost:3005/userProfile/delete/" + postId)
                  .then(({ data }) => {
                    alert(data.msg);
                    window.location.reload(false);
                  });
              }
            } else {
              alert("You can't delete this post");
            }
          }
        });
    }
  }

  useEffect(() => {
    if (localStorage.topic) {
      axios
        .get("http://localhost:3005/post/title/" + localStorage.topic)
        .then(({ data }) => {
          setTitle(data[0].title);
          setPost(data[0].content);
          setPostUserId(data[0].userId);
          setPostId(data[0]._id);
          axios
            .get("http://localhost:3005/comment/title/" + localStorage.topic)
            .then(({ data }) => {
              if (data) {
                console.log(data);
                setComments(data);
              }
            });
        });
    } else {
      navigate("/topicTable");
    }
    //localStorage.removeItem("topic");
  }, []);

  return (
    <div>
      <div>
        <textarea value={title}></textarea>
        <textarea
          value={post}
          onChange={(e) => {
            setPost(e.target.value);
          }}
        ></textarea>
        <button
          onClick={() => {
            editPost();
          }}
        >
          Edit
        </button>
      </div>

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
                  <div>{comments.content}</div>
                  {comments.date}
                  <div>
                    <button
                      onClick={() => {
                        editComment(comments._id, comments.userId);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteComment(comments._id, comments.userId);
                      }}
                    >
                      Delete
                    </button>
                  </div>
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
