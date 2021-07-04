import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import { isAuthenticated, signout } from "../../utils/apiAuth";

import {
  logo,
  cartInactive,
  cartActive,
  enterActive,
  enterInactive,
  exitInactive,
  homeActive,
  homeInactive,
  profileActive,
  profileInactive,
  shoppingBagActive,
  shoppingBagInactive,
  signupActive,
  signupInactive,
} from "../../asserts";
import { itemTotal } from "../../helpers/cartHelpers";

const isActive = (history, path) => {
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
        <Link className="nav-link" to="/">
          <img
            className="nav-icon"
            src={history.location.pathname === "/" ? homeActive : homeInactive}
            style={{ width: "17px", marginRight: "5px" }}
          />
          <span style={isActive(history, "/")}>Home</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/shop">
          <img
            className="nav-icon"
            src={
              history.location.pathname === "/shop"
                ? shoppingBagActive
                : shoppingBagInactive
            }
            style={{ width: "17px", marginRight: "5px" }}
          />
          <span style={isActive(history, "/shop")}>Shop</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/cart">
          <img
            className="nav-icon"
            src={
              history.location.pathname === "/cart" ? cartActive : cartInactive
            }
            style={{ width: "17px", marginRight: "5px" }}
          />
          <span style={isActive(history, "/cart")}>Cart</span>
          {itemTotal() !== 0 && (
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
          )}
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link className="nav-link" to="/user/dashboard">
            <img
              className="nav-icon"
              src={
                history.location.pathname === "/user/dashboard"
                  ? profileActive
                  : profileInactive
              }
              style={{ width: "17px", marginRight: "5px" }}
            />
            <span style={isActive(history, "/user/dashboard")}>Dashboard</span>
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link className="nav-link" to="/admin/dashboard">
            <img
              className="nav-icon"
              src={
                history.location.pathname === "/admin/dashboard"
                  ? profileActive
                  : profileInactive
              }
              style={{ width: "17px", marginRight: "5px" }}
            />
            <span style={isActive(history, "/admin/dashboard")}>Dashboard</span>
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link" to="/signin">
              <img
                className="nav-icon"
                src={
                  history.location.pathname === "/signin"
                    ? enterActive
                    : enterInactive
                }
                style={{ width: "17px", marginRight: "5px" }}
              />
              <span style={isActive(history, "/signin")}>Signin</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              <img
                className="nav-icon"
                src={
                  history.location.pathname === "/signup"
                    ? signupActive
                    : signupInactive
                }
                style={{ width: "17px", marginRight: "5px" }}
              />
              <span style={isActive(history, "/signup")}>Signup</span>
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
            <img
              className="nav-icon"
              src={exitInactive}
              style={{ width: "17px", marginRight: "5px" }}
            />
            Signout
          </span>
        </li>
      )}
    </ul>
  );
};

export default withRouter(Menu);
