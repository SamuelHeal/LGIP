import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import Auth from "../utils/auth";

import "./login.css";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const [loginButton, setLoginButton] = useState("loginButton");
  const [loader, setLoader] = useState("hideLoader");

  const [passwordState, setPasswordState] = useState("password");
  const [iconClass, setIconClass] = useState("eyeIcon");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handlePasswordState = (event) => {
    event.preventDefault();
    if (passwordState === "password") {
      setPasswordState("text");
      setIconClass("eyeIcon2");
    } else {
      setPasswordState("password");
      setIconClass("eyeIcon");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoginButton("hideLoginButton");
    setLoader("loader");
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      window.location.assign("/dashboard");
    } catch (e) {
      console.error(e);
      setLoader("hideLoader");
      setLoginButton("loginButton");
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className='loginContainer'>
      <div className='backgroundAnimation'>
        <svg width='500' height='500' viewBox='0 0 100 100'>
          <polyline
            className='line-cornered stroke-still'
            points='0,0 100,0 100,100'
            stroke-width='3'
            fill='none'
          ></polyline>
          <polyline
            className='line-cornered stroke-still'
            points='0,0 0,100 100,100'
            stroke-width='3'
            fill='none'
          ></polyline>
          <polyline
            className='line-cornered stroke-animation1'
            points='0,0 100,0 100,100'
            stroke-width='3'
            fill='none'
          ></polyline>
          <polyline
            className='line-cornered stroke-animation1'
            points='0,0 0,100 100,100'
            stroke-width='3'
            fill='none'
          ></polyline>
        </svg>
      </div>
      <div className='secondLoginContainer'>
        <div className='loginHeaderContainer'>
          <h1>Legends Investment Groups</h1>
          <h2>Login</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <input
            className='form-input'
            placeholder='Your email'
            name='email'
            type='email'
            value={formState.email}
            onChange={handleChange}
          />
          <input
            className='form-input'
            placeholder='******'
            name='password'
            type={passwordState}
            value={formState.password}
            onChange={handleChange}
          />
          <FontAwesomeIcon
            icon={faEye}
            size='1x'
            className={iconClass}
            onClick={handlePasswordState}
          />
          <button
            className={loginButton}
            style={{ cursor: "pointer" }}
            type='submit'
          >
            Login
          </button>
          <Link to='/signup'>
            <button
              className={loginButton}
              style={{ cursor: "pointer" }}
              type='button'
            >
              Register
            </button>
          </Link>
          <div className={loader}>
            <svg width='200' height='200' viewBox='0 0 100 100'>
              <polyline
                className='line-cornered stroke-still'
                points='0,0 100,0 100,100'
                stroke-width='10'
                fill='none'
              ></polyline>
              <polyline
                className='line-cornered stroke-still'
                points='0,0 0,100 100,100'
                stroke-width='10'
                fill='none'
              ></polyline>
              <polyline
                className='line-cornered stroke-animation'
                points='0,0 100,0 100,100'
                stroke-width='10'
                fill='none'
              ></polyline>
              <polyline
                className='line-cornered stroke-animation'
                points='0,0 0,100 100,100'
                stroke-width='10'
                fill='none'
              ></polyline>
            </svg>
          </div>
        </form>
        {error && <div className='errorMsgLogin'>{error.message}</div>}
      </div>
    </main>
  );
};

export default Login;
