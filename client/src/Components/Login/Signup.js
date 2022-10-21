import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Modal from "react-modal";

import "./signup.css";
import Auth from "../utils/auth";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "-3%",
    marginRight: "-50%",
    marginTop: "30px",
    transform: "translate(-50%, -50%)",
  },
};

const Signup = () => {
  const [termsAgree, setTermsAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [termsErrorMsg, setTermsErrorMsg] = useState("");
  const [privacyErrorMsg, setPrivacyErrorMsg] = useState("");

  const [passwordState, setPasswordState] = useState("password");
  const [iconClass, setIconClass] = useState("eyeIcon");

  const [signupButton, setSignupButton] = useState("signupButton");
  const [loader, setLoader] = useState("hideLoader");

  const termsCheckboxHandler = () => {
    setTermsAgree(!termsAgree);
  };

  const privacyCheckboxHandler = () => {
    setPrivacyAgree(!privacyAgree);
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    if (termsAgree && privacyAgree) {
      setIsOpen(false);
    }
  }, [privacyAgree, termsAgree]);

  function openModal(event) {
    event.preventDefault();
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const bothTermsError = () => {
    setTermsErrorMsg(
      "You must accept the terms and conditions before proceeding"
    );
    setPrivacyErrorMsg(
      "You must accept the privacy agreement before proceeding"
    );
  };

  const termsError = () => {
    setTermsErrorMsg(
      "You must accept the terms and conditions before proceeding"
    );
    setPrivacyErrorMsg("");
  };

  const privacyError = () => {
    setTermsErrorMsg("");
    setPrivacyErrorMsg(
      "You must accept the privacy agreement before proceeding"
    );
  };

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
    if (termsAgree === false && privacyAgree === false) {
      bothTermsError();
    } else if (termsAgree === true && privacyAgree === false) {
      privacyError();
    } else if (termsAgree === false && privacyAgree === true) {
      termsError();
    } else if (formState.password.length < 8) {
      setPasswordError(
        "Password must be greater than or equal to 8 characters"
      );
      setTermsErrorMsg("");
      setPrivacyErrorMsg("");
    } else {
      setTermsErrorMsg("");
      setPrivacyErrorMsg("");
      setSignupButton("hideSignupButton");
      setLoader("loader");
      try {
        const { data } = await addUser({
          variables: { ...formState },
        });

        Auth.login(data.addUser.token);
      } catch (e) {
        console.error(e);
        setLoader("hideLoader");
        setSignupButton("signupButton");
      }
    }
  };

  return (
    <div className='signUpContainer'>
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
      <div className='secondSignUpContainer'>
        <h2>Register</h2>
        <form onSubmit={handleFormSubmit}>
          <div className='inputContainer'>
            <input
              className='form-input'
              placeholder='First Name'
              name='firstName'
              type='text'
              value={formState.name}
              onChange={handleChange}
              required
            />
            <input
              className='form-input'
              placeholder='Last Name'
              name='lastName'
              type='text'
              value={formState.name}
              onChange={handleChange}
              required
            />
            <input
              className='form-input'
              placeholder='Your email'
              name='email'
              type='email'
              value={formState.email}
              onChange={handleChange}
              required
            />
            <input
              className='form-input'
              placeholder='Password (min 8)'
              name='password'
              type={passwordState}
              value={formState.password}
              onChange={handleChange}
              required
            />
          </div>
          <FontAwesomeIcon
            icon={faEye}
            size='1x'
            className={iconClass}
            onClick={handlePasswordState}
          />

          <div className='signupButtonContainer'>
            <button className={signupButton} onClick={openModal}>
              Terms and Conditions
            </button>
            <button className={signupButton} type='submit'>
              Register
            </button>
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
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='Add File'
          >
            <div className='closeContainer'>
              <a className='modalFrontClose' onClick={closeModal}>
                x
              </a>
            </div>
            <div className='termsContainer'>
              <h2>Terms and Conditions</h2>
              <div className='checkboxContainer'>
                <div className='individualCheckbox'>
                  <input
                    type='checkbox'
                    id='termsAgree'
                    onChange={termsCheckboxHandler}
                    checked={termsAgree}
                  />
                  <label className='termsCheckbox' htmlFor='agree'>
                    {" "}
                    <p>
                      I agree to the <b>terms and conditions</b>
                    </p>
                  </label>
                </div>
                <div className='individualCheckbox'>
                  <input
                    type='checkbox'
                    id='privacyAgree'
                    onChange={privacyCheckboxHandler}
                    checked={privacyAgree}
                  />
                  <label className='termsCheckbox' htmlFor='agree'>
                    {" "}
                    <p>
                      I agree to <b>privacy statement</b>
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </Modal>

          <div className='errorMsg'>{termsErrorMsg}</div>
          <div className='errorMsg'>{privacyErrorMsg}</div>
          <div className='errorMsg'>{passwordError}</div>
          {error && <div className='errorMsg'>{error.message}</div>}
        </form>
        <p className='loginDirect'>
          Already have an account? Login{" "}
          <Link className='loginLink' to='/login'>
            Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
