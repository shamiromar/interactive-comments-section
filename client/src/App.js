import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Comments from "./Components/Comments"
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import AllComments from "./Components/AllComments";
import NavBar from "./Components/Navbar";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (

    <div>

      <Router>
      <NavBar/>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/allcomments" element={<AllComments />} />
          </Routes>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
