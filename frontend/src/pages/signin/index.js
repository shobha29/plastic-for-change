import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { banner2 } from "../../asserts";
import { Layout } from "../../components";
import { signin, authenticate, isAuthenticated } from "../../utils/apiAuth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "shobha@gmail.com",
    password: "123@123",
    error: "",
    loading: false,
    redireactToReferrer: false,
  });

  const { email, password, error, loading, redireactToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  const signinForm = () => (
    <form>
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
      </div>

      <button onClick={handleSubmit} className="btn btn-success">
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
      {showLoading()}
      {showError()}
      {signinForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
