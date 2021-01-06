import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import FriendsPage from "./Pages/FriendsPage/FriendsPage";

import axios from "axios";
import { authenticate, isAuth } from "./helpers/auth";
import { useState } from "react";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(isAuth() ? true : false);
  return (
    <div className="App">
      <Navbar {...{ isLoggedIn, setLoggedIn }} />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route
          exact
          path="/login"
          render={(props) =>
            !isAuth() ? (
              <LoginPage {...{ setLoggedIn }} />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            )
          }
        ></Route>
        <Route
          exact
          path="/signup"
          render={(props) =>
            !isAuth() ? (
              <SignupPage />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            )
          }
        ></Route>
        <Route
          exact
          path="/friends"
          render={(props) =>
            isAuth() ? (
              <FriendsPage />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            )
          }
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
