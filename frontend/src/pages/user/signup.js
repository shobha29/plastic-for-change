import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Layout } from "../../components";
import { signup } from "../../utils/apiAuth";

import { EMAIL_REGEX, PASSWORD_LENGTH } from "../../constants";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const [frontEndError, setFrontEndError] = useState({
    isError: false,
    message: "",
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (e) => {
    setFrontEndError({ isError: false, message: "" });
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const validateEmail = (input) => {
    if (input.match(EMAIL_REGEX)) {
      return true;
    } else {
      return false;
    }
  };

  const validateChecks = () => {
    if (email === "" || password === "") {
      setFrontEndError({ isError: true, message: "All fields are required." });
      return false;
    } else {
      if (validateEmail(email)) {
        if (password.length < PASSWORD_LENGTH) {
          setFrontEndError({
            isError: true,
            message: "Password must be of at least 6 characters.",
          });
          return false;
        }
      } else {
        setFrontEndError({ isError: true, message: "Invalid email address." });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFrontEndError({ isError: false, message: "" });
    if (validateChecks()) {
      setValues({ ...values, error: false });
      signup({ name, email, password }).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      });
    }
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
        {frontEndError.isError && (
          <p className="text-danger font-weight-bold">
            **{frontEndError.message}
          </p>
        )}
      </div>

      <button onClick={handleSubmit} className="btn btn-success">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <Layout
      title="Signup"
      description="Signup to Plastic for Change for Buying and Selling website"
      classname="container col=md-8 offset-md-2"
      backgroundClassName="signup"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
