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
  const [editedComment, setEditedComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [date, setDate] = useState(new Date());

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
            axios
              .post("http://localhost:3005/comment/new", {
                title: localStorage.topic,
                content: comment,
                username: data.username,
                userId: data._id,
                date: new Date(),
              })
              .then(({ data }) => {
                alert(data.msg);
                axios
                  .get("http://localhost:3005/comment/title/" + localStorage.topic)
                  .then(({ data }) => {
                    if (data) {
                      setComments(data);
                    }
                  })
                  .catch((error) => {
                    console.error("Error fetching comments after submission:", error);
                  });
              })
              .catch((error) => {
                console.error("Error submitting comment:", error);
                window.location.reload(false);
              });
          } else {
            console.log("wrong");
            navigate("/topicTable"); //go to login
          }
        })
        .catch((error) => {
          console.error("Error verifying user:", error);
        });
    } else {
      window.alert("you have to login to make a comment");
      navigate("/login"); // go to login
    }
  }

  function saveEditedComment(comment) {
    axios
      .put(`http://localhost:3005/comment/${comment._id}`, {
        content: editedComment,
      })
      .then(({ data }) => {
        alert(data.msg);
        setEditCommentId(null);
        setEditedComment("");
        // Refresh comments after successful update
        axios
          .get("http://localhost:3005/comment/title/" + localStorage.topic)
          .then(({ data }) => {
            if (data) {
              setComments(data);
            }
          })
          .catch((error) => {
            console.error("Error fetching comments after update:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  }

  function cancelEdit() {
    // Reset the editCommentId state and clear the editedComment state
    setEditCommentId(null);
    setEditedComment("");
  }



  //Function to Delete Comment
  function deleteComment(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3005/comment/${id}`)
        .then(({ data }) => {
          if (data.msg === "comment deleted") {
            // Refresh comments after successful deletion
            axios
              .get("http://localhost:3005/comment/title/" + localStorage.topic)
              .then(({ data }) => {
                if (data) {
                  setComments(data);
                }
              })
              .catch((error) => {
                console.error("Error fetching comments after deletion:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error deleting comment:", error);
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
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });

      axios
        .get("http://localhost:3005/comment/title/" + localStorage.topic)
        .then(({ data }) => {
          if (data) {
            setComments(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    } else {
      navigate("/topicTable");
    }
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
      <button onClick={() => submitComment()}>Submit</button>
      <div>
        <ul>
        {comments.map((comment) => (
  <div key={comment._id}>
    <li>
      {comment.username}
      {editCommentId === comment._id ? (
        <>
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <Moment fromNow>{comment.date}</Moment>
          <button onClick={() => saveEditedComment(comment)}>Save</button>
          <button onClick={() => cancelEdit(comment._id)}>Cancel</button>
        </>
      ) : (
        <>
          {comment.content}
          <Moment fromNow>{comment.date}</Moment>
          <button onClick={() => setEditCommentId(comment._id)}>Edit</button>
        </>
      )}
      <button onClick={() => deleteComment(comment._id)}>Delete</button>
       </li>
       </div>
    ))}
        </ul>
      </div>
    </div>
  );
}

export default PostPage;



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Moment from "react-moment";
// import axios from "axios";

// function PostPage() {
//   const [comment, setComment] = useState("");
//   const navigate = useNavigate();
//   const [user, setUser] = useState("");
//   const [post, setPost] = useState("");
//   const [title, setTitle] = useState("");
//   const [comments, setComments] = useState([]);
//   const [date, setDate] = useState(new Date());

//   function submitComment() {
//     if (localStorage.token) {
//       axios
//         .post("http://localhost:3005/user/verify", {
//           token: localStorage.getItem("token"),
//         })
//         .then(({ data }) => {
//           //setUser(data);
//           console.log(data);
//           if (data._id) {
//             setUser(data);
//             console.log({
//               title: localStorage.topic,
//               content: comment,
//               username: data.username,
//               userId: data._id,
//               date: new Date(),
//             });
//             axios
//               .post("http://localhost:3005/comment/new", {
//                 title: localStorage.topic,
//                 content: comment,
//                 username: data.username,
//                 userId: data._id,
//                 date: new Date(),
//               })
//               .then(({ data }) => {
//                 alert(data.msg);
//                 //window.location.reload(false);
//                 axios
//                   .get("http://localhost:3005/comment/title/" + localStorage.topic)
//                   .then(({ data }) => {
//                     if (data) {
//                       setComments(data);
//                     }
//                   })
//                   .catch((error) => {
//                     console.error("Error fetching comments after submission:", error);
//                   });
//               })
//               .catch((error) => {
//                 console.error("Error submitting comment:", error);

//                 window.location.reload(false);
//               });
//           } else {
//             console.log("wrong");
//             navigate("/topicTable"); //go to login
//           }
//         })
//         .catch((error) => {
//           console.error("Error verifying user:", error);
//         });
//     } else {
//       window.alert("you have to login to make a comment");
//       navigate("/login"); // go to login
//     }
//   }



//   //Function to Delete Comment
//   function deleteComment(commentId) {
//     const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
//     if (confirmDelete) {
//       axios
//         .delete(`http://localhost:3005/comment/${commentId}`)
//         .then(({ data }) => {
//           if (data.msg === "comment deleted") {
//             // Refresh comments after successful deletion
//             axios
//               .get("http://localhost:3005/comment/title/" + localStorage.topic)
//               .then(({ data }) => {
//                 if (data) {
//                   setComments(data);
//                 }
//               })
//               .catch((error) => {
//                 console.error("Error fetching comments after deletion:", error);
//               });
//           }
//         })
//         .catch((error) => {
//           console.error("Error deleting comment:", error);
//         });
//     }
//   }

//   useEffect(() => {
//     if (localStorage.topic) {
//       axios.get("http://localhost:3005/post/title/" + localStorage.topic)
//         .then(({ data }) => {
//           setTitle(data[0].title);
//           setPost(data[0].content);
//         })
//         .catch((error) => {
//           console.error("Error fetching post:", error);
//         });

//       axios.get("http://localhost:3005/comment/title/" + localStorage.topic)
//         .then(({ data }) => {
//           if (data) {
//             setComments(data);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching comments:", error);
//         });
//     } else {
//       navigate("/topicTable");
//     }
//   }, []);

//   useEffect(() => {
//     // Update the newReply state whenever reply or user changes
//     setNewReply({
//       content: reply,
//       username: user.username,
//       userId: user._id,
//       date: new Date(),
//       commentId: comments._id,
//     });
//   }, [reply, user]);
// }
//   /*function replyOnComment() {
//     if (localStorage.getItem("token")) {
//       axios
//         .post("http://localhost:3005/user/verify", {
//           token: localStorage.getItem("token"),
//         })
//         .then(({ data }) => {
//           if (data._id) {
//             setUser(data);
//             console.log(data._id);
//             axios
//               .post("http://localhost:3005/reply", newReply)
//               .then(({ data }) => {
//                 console.log(newReply);
//                 alert(data.msg);
//                 //window.location.reload(false);
//               });
//           } else {
//             navigate("/"); //go to login
//           }
//         });
//     } else {
//       window.alert("you have to login to reply");
//       navigate("/login"); // go to login
//     }
//   }*/

//   // useEffect(() => {
//   //   if (localStorage.topic) {
//   //     axios
//   //       .get("http://localhost:3005/post/title/" + localStorage.topic)
//   //       .then(({ data }) => {
//   //         console.log(data[0].title);
//   //         setTitle(data[0].title);
//   //         setPost(data[0].content);

//   //         axios
//   //           .get("http://localhost:3005/comment/title/" + localStorage.topic)
//   //           .then(({ data }) => {
//   //             if (data) {
//   //               console.log(data);
//   //               setComments(data);
//   //             }
//   //           });

//   //         /*axios
//   //           .get("http://localhost:3005/comment/title/" + localStorage.topic)
//   //           .then(({ data }) => {
//   //             console.log(data);
//   //             if (data) {
//   //               console.log(data);
//   //               setComments(data);
//   //               axios
//   //                 .get("http://localhost:3005/reply/" + res._id)
//   //                 .then(({ reply }) => {
//   //                   if (reply) {
//   //                     setReplies(reply);
//   //                   }
//   //                 });
//   //             }
//   //           });*/
//   //       });
//   //   } else {
//   //     navigate("/topicTable");
//   //   }
//   //   //localStorage.removeItem("topic");
//   // }, []);

//   return (
//     <div>
//       <textarea placeholder="Title" value={title}></textarea>
//       <textarea
//         value={post}
//         onChange={(e) => {
//           setPost(e.target.value);
//         }}
//       ></textarea>
//       <label htmlFor="comment"></label>
//       <textarea
//         placeholder="Comment"
//         value={comment}
//         onChange={(e) => {
//           setComment(e.target.value);
//         }}
//       ></textarea>
//       <button
//         onClick={() => {
//           submitComment();
//         }}
//       >
//         Submit
//       </button>
//       <div>
//         <ul>

//         {comments.map((comment) => (
//             <div key={comment._id}>
//               <li>
//                 {comment.username}
//                 {comment.content}
//                 <button onClick={() => deleteComment(comment._id)}>Delete</button>
//               </li>
//             </div>
//           ))}

//           {comments.map((comments) => {
//             return (
//               <div>
//                 <li>
//                   {comments.username}
//                   <div>{comments.content}</div>
//                 </li>
//               </div>
//             );
//           })}

//         </ul>
//       </div>
//     </div>
//   );
// }

// export default PostPage;

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
