import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  function toLogin() {
    navigate("/login");
  }

  function toSignup() {
    navigate("/signup");
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary nav">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link className="navLink" href="/">
            Home
          </Nav.Link>
          <Nav.Link className="navLink" href="/topicTable">
            Forum
          </Nav.Link>
        </Nav>
        <Nav>
          {isLoggedIn ? (
            <Button
              className="navBtn"
              variant="info"
              size="sm"
              onClick={() => {
                handleLogout();
                signOut();
              }}
            >
              Logout
            </Button>
          ) : (
            <div>
              <Button
                className="navBtn"
                variant="info"
                size="sm"
                onClick={() => {
                  toLogin();
                  handleLogin();
                }}
              >
                Login
              </Button>
              <Button
                className="navBtn"
                variant="info"
                size="sm"
                onClick={() => {
                  toSignup();
                  handleLogin();
                }}
              >
                Signup
              </Button>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
