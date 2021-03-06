import React from "react";
import { useHistory } from "react-router-dom";
import "./signupPage.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { configs } from "../../configs";
import { ToastContainer, toast } from "react-toastify";

function SignupPage() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    console.log("sent", data);
    try {
      const response = await axios.post(
        `${configs.SERVER_URI}/api/signup`,
        data
      );
      console.log("received", response);
      if (response) {
        toast.success("Account created successfully");
        setTimeout(() => {
          history.push("/friends");
        }, 1500);
      } else {
        toast.error("something went wrong");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
      console.log(err.response.data);
    }
  };

  return (
    <div className="signupPage">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="formTitle">Sign up</span>
        <div>
          <label htmlFor="name">name</label>
          <input type="text" required ref={register} name="name" />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" required ref={register} name="email" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            required
            minLength={6}
            ref={register}
            name="password"
          />
        </div>
        <button>Sign up</button>
      </form>
    </div>
  );
}

export default SignupPage;
