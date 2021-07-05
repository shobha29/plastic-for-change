import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { Layout, ShowImage } from "../../components";
import { isAuthenticated } from "../../utils/apiAuth";
import { getPurchaseHistory } from "../../utils/apiUser";

const UserDashboard = () => {
  const [history, setHistory] = useState([]);

  const progressSteps = [
    "Not processed",
    "Processing",
    "Packaged",
    "Shipped",
    "Delivered",
  ];

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
          const purchaseDate = h.createdAt;
          const status = h.status;
          h.products.map((product) => {
            product.purchaseDate = purchaseDate;
            product.status = status;
            purchaseHistory.push(product);
          });
        });
        setHistory(purchaseHistory.reverse());
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

  const productStatus = (status) => {
    if (status === "Not processed") {
      return <span className="badge badge-secondary badge-pill">{status}</span>;
    } else if (status === "Processing") {
      return <span className="badge badge-primary badge-pill">{status}</span>;
    } else if (status === "Packaged") {
      return <span className="badge badge-info badge-pill">{status}</span>;
    } else if (status === "Shipped") {
      return <span className="badge badge-warning badge-pill">{status}</span>;
    } else if (status === "Delivered") {
      return <span className="badge badge-success badge-pill">{status}</span>;
    } else {
      return <span className="badge badge-danger badge-pill">{status}</span>;
    }
  };

  const trackOrder = (status) => {
    let progressbarColor;
    let percentage;
    let circleColor;
    let index;

    if (status === "Not processed") {
      progressbarColor = "progress-bar";
      percentage = "0%";
      circleColor = "bg-secondary";
      index = 0;
    } else if (status === "Processing") {
      progressbarColor = "progress-bar bg-primary";
      percentage = "25%";
      circleColor = "bg-primary";
      index = 1;
    } else if (status === "Packaged") {
      progressbarColor = "progress-bar bg-info";
      percentage = "50%";
      circleColor = "bg-info";
      index = 2;
    } else if (status === "Shipped") {
      progressbarColor = "progress-bar bg-warning";
      percentage = "75%";
      circleColor = "bg-warning";
      index = 3;
    } else if (status === "Delivered") {
      progressbarColor = "progress-bar bg-success";
      percentage = "100%";
      circleColor = "bg-success";
      index = 4;
    }

    return (
      <>
        <p className="font-weight-bold">Track Order</p>
        <div className="position-relative">
          <div className="progress mb-4" style={{ height: "5px" }}>
            <div
              className={progressbarColor}
              role="progressbar"
              style={{ width: percentage }}
            ></div>
            <div
              className="position-absolute d-flex justify-content-between"
              style={{ top: -5, width: "100%" }}
            >
              {progressSteps.map((step, i) => (
                <div
                  key={i}
                  className={index >= i ? circleColor : "bg-secondary"}
                  style={{
                    width: "15px",
                    height: "15px",
                    border: "2px solid white",
                    borderRadius: "10px",
                    background: "black",
                  }}
                  data-toggle="tooltip"
                  data-placement="top"
                  title={step}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        {history.length ? (
          <div className="d-flex flex-wrap">
            {history.map((item, i) => {
              return (
                <div
                  key={i}
                  className="m-5  p-2"
                  style={{
                    boxShadow: "2px 2px 10px 1px #9E9E9E",
                  }}
                >
                  {productStatus(item.status)}
                  <ShowImage item={item} url="product" />
                  <h6>Product name: {item.name}</h6>
                  <h6>Product price: ₹{item.price}</h6>
                  <h6>
                    Purchased date:{" "}
                    {moment(item.purchaseDate).format("DD MMM, YYYY")}
                  </h6>
                  {item.status !== "Cancelled" && trackOrder(item.status)}
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
