import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TopicTable() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  function toCreatePost() {
    navigate("/createPost");
  }

  useEffect(() => {
    axios.get("http://localhost:3005/").then(({ data }) => {
      setTopics(data);
    });
  }, []);
  return (
    <div className="homeContainer">
      <div className="homeHeader">
        <h1 className="homeHeading">Welcome to Breastfeeding.com</h1>
      </div>
      <div className="tableContainer">
        <button
          onClick={() => {
            toCreatePost();
          }}
        >
          Create new topic
        </button>
        <ul>
          {topics.map((topics) => {
            return (
              <div className="table">
                <li
                  className="tableList"
                  key={topics._id}
                  onClick={() => {
                    localStorage.setItem("topic", topics.title);
                    navigate("/post");
                  }}
                >
                  {topics.title}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TopicTable;
