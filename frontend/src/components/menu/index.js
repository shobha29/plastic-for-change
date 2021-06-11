import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import { isAuthenticated, signout } from "../../utils/apiAuth";

import { logo } from "../../asserts";
import { itemTotal } from "../../helpers/cartHelpers";

const isAcive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ffffff", fontSize: "18px" };
  } else {
    return { color: "#bbc9c1" };
  }
};

const Menu = (props) => {
  const { history } = props;
  return (
    <ul
      className="nav nav-tabs bg-success"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <li
        className="nav-item"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          color: "#ffffff",
        }}
      >
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            style={{
              width: "50px",
              height: "50px",
              margin: "5px 10px 5px 20px",
              cursor: "pointer",
            }}
          />
        </Link>
        <h2>Plastic for Change</h2>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/" style={isAcive(history, "/")}>
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/shop" style={isAcive(history, "/shop")}>
          Shop
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/cart" style={isAcive(history, "/cart")}>
          Cart
          {itemTotal() !== 0 && (
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
          )}
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/user/dashboard"
            style={isAcive(history, "/user/dashboard")}
          >
            Dashboard
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/admin/dashboard"
            style={isAcive(history, "/admin/dashboard")}
          >
            Dashboard
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signin"
              style={isAcive(history, "/signin")}
            >
              Signin
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signup"
              style={isAcive(history, "/signup")}
            >
              Signup
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#bbc9c1" }}
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  );
};

export default withRouter(Menu);
