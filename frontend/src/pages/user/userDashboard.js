import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { Layout, ShowImage } from "../../components";
import { isAuthenticated } from "../../utils/apiAuth";
import { getPurchaseHistory } from "../../utils/apiUser";

import {
  deliveredActive,
  deliveredInactive,
  notProcessedActive,
  notProcessedInactive,
  packagedActive,
  packagedInactive,
  processingActive,
  processingInactive,
  shippedActive,
  shippedInactive,
} from "../../asserts";

const UserDashboard = ({ history }) => {
  const [historyData, setHistoryData] = useState([]);

  const progressSteps = [
    {
      active: notProcessedActive,
      inactive: notProcessedInactive,
      step: "Not processed",
    },
    {
      active: processingActive,
      inactive: processingInactive,
      step: "Processing",
    },
    {
      active: packagedActive,
      inactive: packagedInactive,
      step: "Packaged",
    },
    {
      active: shippedActive,
      inactive: shippedInactive,
      step: "Shipped",
    },
    {
      active: deliveredActive,
      inactive: deliveredInactive,
      step: "Delivered",
    },
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
        setHistoryData(purchaseHistory.reverse());
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
    let badge;

    switch (status) {
      case "Not processed":
        badge = "badge badge-secondary badge-pill";
        break;
      case "Processing":
        badge = "badge badge-primary badge-pill";
        break;
      case "Packaged":
        badge = "badge badge-info badge-pill";
        break;
      case "Shipped":
        badge = "badge badge-warning badge-pill";
        break;
      case "Delivered":
        badge = "badge badge-success badge-pill";
        break;
      case "Cancelled":
        badge = "badge badge-danger badge-pill";
        break;
    }

    return <span className={badge}>{status}</span>;
  };

  const trackOrder = (status) => {
    let percentage;
    let index;

    switch (status) {
      case "Not processed":
        percentage = "0%";
        index = 0;
        break;
      case "Processing":
        percentage = "25%";
        index = 1;
        break;
      case "Packaged":
        percentage = "50%";
        index = 2;
        break;
      case "Shipped":
        percentage = "75%";
        index = 3;
        break;
      case "Delivered":
        percentage = "100%";
        index = 4;
        break;
    }

    return (
      <>
        <p className="font-weight-bold">Track Order</p>
        <div className="position-relative">
          <div className="progress mb-4" style={{ height: "2px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: percentage }}
            />
            <div
              className="position-absolute d-flex justify-content-between"
              style={{ top: -6, width: "100%" }}
            >
              {progressSteps.map((s, i) => (
                <div
                  key={i}
                  data-toggle="tooltip"
                  data-placement="top"
                  title={s.step}
                >
                  <div
                    className={index >= i ? "bg-primary" : "bg-secondary"}
                    style={{
                      width: "15px",
                      height: "15px",
                      border: "2px solid white",
                      borderRadius: "10px",
                      background: "black",
                    }}
                  />
                  <img
                    src={index >= i ? s.active : s.inactive}
                    style={{
                      width: "15px",
                      height: "15px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  const purchaseHistory = (historyData) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        {historyData.length ? (
          <div className="d-flex flex-wrap">
            {historyData.map((item, i) => {
              return (
                <div
                  key={i}
                  className="m-5  p-2"
                  style={{
                    boxShadow: "2px 2px 10px 1px #9E9E9E",
                  }}
                >
                  {productStatus(item.status)}
                  <ShowImage
                    item={item}
                    url="product"
                    history={history}
                    productId={item._id}
                  />
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
          {purchaseHistory(historyData)}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
