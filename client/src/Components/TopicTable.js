import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TopicTable() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3005/").then(({ data }) => {
      setTopics(data);
    });
  }, []);
  return (
    <div>
      <ul>
        {topics.map((topics) => {
          return (
            <div>
              <li
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
  );
}

export default TopicTable;
