import React from "react";
import "./loginPage.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { configs } from "../../configs";
import { authenticate, isAuth } from "../../helpers/auth";
import { ToastContainer, toast } from "react-toastify";

function LoginPage({ setLoggedIn }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${configs.SERVER_URI}/api/login`,
        data
      );
      authenticate(response, () => {
        if (isAuth()) {
          toast.success("Login successful");
          setTimeout(() => {
            setLoggedIn(true);
          }, 1500);
        } else {
          console.log("something went wrong, try to log in again");
        }
      });
    } catch (err) {
      toast.error(err.response.data.error);
      console.log(err.response.data);
    }
  };

  return (
    <div className="loginPage">
      <ToastContainer autoClose={3500} />
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
