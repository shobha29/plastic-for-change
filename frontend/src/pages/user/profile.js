import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import Layout from "../../components/layout";
import { isAuthenticated } from "../../utils/apiAuth";
import { read, update, updateUser } from "../../utils/apiUser";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: false,
    success: false,
  });

  const { token } = isAuthenticated();
  const { name, email, password, confirmPassword, error, success } = values;

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const matchPassword = () => {
    if (password === confirmPassword) {
      return true;
    }
    return false;
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    if (matchPassword()) {
      update(match.params.userId, token, { name, email, password }).then(
        (data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            updateUser(data, () => {
              setValues({
                ...values,
                name: data.name,
                email: data.email,
                success: true,
              });
            });
          }
        }
      );
    } else {
      setValues({ ...values, error: true, success: false });
    }
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  const profileUpdate = (name, email, password, confirmPassword) => (
    <form className="mb-3" onClick={clickSubmit}>
      <h2>Profile update</h2>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          disabled
          style={{ cursor: "not-allowed" }}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Confirm Password</label>
        <input
          type="password"
          onChange={handleChange("confirmPassword")}
          className="form-control"
          value={confirmPassword}
        />
      </div>

      {error && (
        <p
          className="text-danger"
          style={{ fontWeight: "bold" }}
        >{`**Password don\'t match`}</p>
      )}

      <button className="btn btn-primary">Submit</button>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link to="/user/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      classname="container"
      backgroundClassName="updateProfile"
    >
      {goBack()}
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {profileUpdate(name, email, password, confirmPassword)}
          {redirectUser(success)}
        </div>
      </div>
      {goBack()}
    </Layout>
  );
};

export default Profile;
