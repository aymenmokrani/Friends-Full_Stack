import React, { useEffect } from "react";
import "./loginPage.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useDataLayerValue } from "../../utils/DataLayer";
import { configs } from "../../configs";
import { authenticate, isAuth } from "../../helpers/auth";

function LoginPage({ setLoggedIn }) {
  const cookies = new Cookies();

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${configs.SERVER_URI}/api/login`,
        data
      );
      authenticate(response, () => {
        if (isAuth()) {
          setLoggedIn(true);
        } else {
          console.log("something went wrong, you're not logged in");
        }
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="formTitle">Login</span>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" ref={register} required name="email" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            ref={register}
            required
            minLength={6}
            name="password"
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default LoginPage;
