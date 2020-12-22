import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import FriendsPage from "./Pages/FriendsPage/FriendsPage";

import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { useDataLayerValue } from "./utils/DataLayer";

function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [{ isAuth }, dispatch] = useDataLayerValue();

  const authenticate = async () => {
    if (token) {
      try {
        const response = await axios.post(`${configs.SERVER_URI}/api/user`, {
          token,
        });
        const results = response.data;
        if (results.isAuth) return true;
        else return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    authenticate().then((data) => {
      dispatch({
        type: "SET_AUTH",
        payload: data,
      });
    });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <Route exact path="/friends">
          <FriendsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
