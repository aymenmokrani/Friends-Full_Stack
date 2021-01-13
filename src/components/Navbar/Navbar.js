import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { signout } from "../../helpers/auth";

function Navbar({ isLoggedIn, setLoggedIn }) {
  const logout = () => {
    signout();
    setLoggedIn(false);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/" className="logoName">
          <span>Friends</span>
        </Link>
      </div>
      <div className="actions">
        {!isLoggedIn && (
          <div>
            <Link to="/login">
              <button className="loginBtn">Log in</button>
            </Link>

            <Link to="/signup">
              <button className="signupBtn">Sign up</button>
            </Link>
          </div>
        )}

        {isLoggedIn && (
          <div>
            <span className="username">Welcome {isLoggedIn.name} |</span>
            <Link to="/">
              <button onClick={logout} className="signupBtn">
                logout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
