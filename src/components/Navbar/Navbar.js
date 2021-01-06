import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { signout } from "../../helpers/auth";

function Navbar({ isLoggedIn, setLoggedIn }) {
  console.log(isLoggedIn);
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
          <Link to="/login">
            <button className="loginBtn">Log in</button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup">
            <button className="signupBtn">Sign up</button>
          </Link>
        )}

        {isLoggedIn && (
          <Link to="/">
            <button onClick={logout} className="signupBtn">
              logout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
