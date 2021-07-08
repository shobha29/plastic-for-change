import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { Layout } from "../../components";
import { signin, authenticate, isAuthenticated } from "../../utils/apiAuth";
import { EMAIL_REGEX, PASSWORD_LENGTH } from "../../constants";

import ForgotPassword from "./forgotPassword";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redireactToReferrer: false,
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [frontEndError, setFrontEndError] = useState({
    isError: false,
    message: "",
  });

  const { email, password, error, loading, redireactToReferrer } = values;
  const { user } = isAuthenticated();

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
      setValues({ ...values, error: false, loading: true });
      signin({ email, password }).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              redireactToReferrer: true,
            });
          });
        }
      });
    }
  };

  const signinForm = () => (
    <form className="d-flex flex-column">
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
      <p
        className="align-self-end text-primary font-weight-bold"
        style={{ cursor: "pointer" }}
        onClick={() => setShowForgotPassword(true)}
      >
        Forgot password?
      </p>

      <button
        onClick={handleSubmit}
        className="btn btn-success align-self-start"
      >
        Signin
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

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redireactToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="Signin"
      description="Signin to Plastic for Change for Buying and Selling website"
      classname="container col-md-8 offset-md-2"
      backgroundClassName="signin"
    >
      <ForgotPassword
        showForgotPassword={showForgotPassword}
        setShowForgotPassword={setShowForgotPassword}
      />
      {showLoading()}
      {showError()}
      {signinForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
