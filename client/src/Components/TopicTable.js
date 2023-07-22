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
    <div className="generalContainer">
      <div className="generalHeader">
        <h1 className="generalHeading">Breastfeeding.com</h1>
      </div>
      <div className="contentContainer">
        <h3 className="headerText">Topics' table</h3>
        <button
          className="createBtn"
          onClick={() => {
            toCreatePost();
          }}
        >
          Create new topic
        </button>
        <div className="tableContainer">
          <ul className="table">
            {topics.map((topics) => {
              return (
                <div>
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
    </div>
  );
}

export default TopicTable;