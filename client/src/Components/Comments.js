import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CommentSection() {
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState({
    content: "",
    userId: "",
    createdAt: Date.now(),
    upvotes: "",
    replies: [],
  });
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({
    _id: "",
    email: "",
  });
  const [replyContent, setReplyContent] = useState("");
  const [editCommentContent, setEditCommentContent] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3005/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data.userData._id) {
            console.log(data.userData);
            setUser(data.userData);
            axios
              .get("http://localhost:3005/comment/" + data.userData._id)
              .then(({ data }) => {
                console.log("user comments", data);
                setComments(data);
              });
          } else {
            navigate("/");
          }
        });
    } else {
      navigate("/");
    }
  }, []);

  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
      userId: user._id,
    }));
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    console.log(newComment);

    axios
      .post("http://localhost:3005/comment", newComment)
      .then(() => {
        setNewComment({
          content: "",
          userId: "",
          createdAt: Date.now(),
          upvotes: "",
          replies: [],
        });
        // Fetch the updated comments after successful submission
        axios
          .get("http://localhost:3005/comment/" + user._id)
          .then(({ data }) => {
            console.log("user comments", data);
            setComments(data);
          })
          .catch((error) => {
            console.error("Error fetching comments:", error);
          });
      })
      .catch((error) => {
        console.error("Error sending comment data:", error);
      });
  };

  const handleCommentDelete = (commentId) => {
    axios
      .delete(`http://localhost:3005/comment/${commentId}`)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  const handleCommentEdit = (commentId, updatedContent) => {
    axios
      .put(`http://localhost:3005/comment/${commentId}`, {
        content: updatedContent,
      })
      .then(() => {
        // Fetch the updated comments after successful edit
        axios
          .get("http://localhost:3005/comment/" + user._id)
          .then(({ data }) => {
            console.log("user comments", data);
            setComments(data);
          })
          .catch((error) => {
            console.error("Error fetching comments:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  };

  const handleReply = (commentId) => {
    const reply = {
      content: replyContent,
      userId: user._id,
      createdAt: Date.now(),
    };

    axios
      .post(`http://localhost:3005/comment/${commentId}/reply`, reply)
      .then(() => {
        // Fetch the updated comments after successful reply
        axios
          .get("http://localhost:3005/comment/" + user._id)
          .then(({ data }) => {
            console.log("user comments", data);
            setComments(data);
          })
          .catch((error) => {
            console.error("Error fetching comments:", error);
          });
      })
      .catch((error) => {
        console.error("Error sending reply data:", error);
      }); 
  };

  function disconnect() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="comments-container">
      <div className="header">
        <h2>Comments</h2>
        <button
            className="disconnect-btn"
            onClick={() => {
              disconnect();
            }}
          >
            Disconnect
          </button>
      </div>

      <form onSubmit={handleCommentSubmit}>
        <label>
          Comment:
          <textarea
            name="content"
            placeholder="Add a comment..."
            value={newComment.content}
            onChange={handleCommentChange}
          />
        </label>
        <br />
        <button className="submit-btn" type="submit">Submit</button>
      </form>
      <div className="comment-section">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div className="user-date-container">
                      <p>UserID: {comment.userId}</p>
                      <p> {comment.createdAt}</p>
                    </div>
            <p className="comments"> {comment.content}</p>
            {/* <p>UserID: {comment.userId}</p> */}
            {/* <p>Created At: {comment.createdAt}</p>
            <p>Upvotes: {comment.upvotes}</p> */}
            {isEditing && editCommentId === comment._id ? (
              <div>
                <input
                  type="text"
                  value={editCommentContent}
                  onChange={(e) => setEditCommentContent(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleCommentEdit(comment._id, editCommentContent);
                    setIsEditing(false);
                    setEditCommentContent("");
                    setEditCommentId(null);
                  }}
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <button
                className="edit-btn"
                  onClick={() => {
                    setIsEditing(true);
                    setEditCommentContent(comment.content);
                    setEditCommentId(comment._id);
                    
                  }}
                >
                  Edit
                </button>
                <button 
                className="delete-btn"
                onClick={() => handleCommentDelete(comment._id)}>
                  Delete
                </button>
              </>
            )}

            {/* Render Replies */}
            <div className="replies">
              {comment.replies &&
                comment.replies.map((reply) => (
                  <div key={reply._id} className="reply-item">

                    <div className="user-date-container">
                      <p>UserID: {reply.userId}</p>
                      <p> {reply.createdAt}</p>
                    </div>

                    <p className="comments reply-comment">
                       {reply.content}
                    </p>
                  </div>
                ))}
            </div>

            {/* Reply Form */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleReply(comment._id);
                setReplyContent("");
              }}
            >
              <label>
                Reply:
                <textarea
                  name="replyContent"
                  value={replyContent}
                  onChange={(event) => setReplyContent(event.target.value)}
                />
              </label>
              <button className="submit-btn" type="submit">Submit Reply</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
