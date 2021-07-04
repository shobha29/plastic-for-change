import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { Layout } from "../../components";
import { isAuthenticated } from "../../utils/apiAuth";
import { getPurchaseHistory } from "../../utils/apiUser";
import ShowImage from "../home/showImage";

const UserDashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        let purchaseHistory = [];
        data.map((h) => {
          h.products.map((p) => purchaseHistory.push(p));
        });
        setHistory(purchaseHistory);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="card">
        <h3 className="card-header">User Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">
          {role === 1 ? "Admin" : "Registered User"}
        </li>
      </ul>
    </div>
  );

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        {history.length ? (
          <div className="d-flex flex-wrap">
            {history.map((h, i) => {
              return (
                <div
                  key={i}
                  className="m-5  p-2"
                  style={{
                    boxShadow: "2px 2px 10px 1px #9E9E9E",
                  }}
                >
                  <ShowImage item={h} url="product" />
                  <h6>Product name: {h.name}</h6>
                  <h6>Product price: ₹{h.price}</h6>
                  <h6>Purchased date: {moment(h.createdAt).fromNow()}</h6>
                </div>
              );
            })}
          </div>
        ) : (
          <ul className="list-group">
            <li className="list-group-item">No purchase history</li>
          </ul>
        )}
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Hello, ${name}`}
      classname="container-fluid"
      backgroundClassName="dashborad"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>

        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
