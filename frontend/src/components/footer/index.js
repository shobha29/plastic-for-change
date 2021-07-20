import React from "react";

import { mail, location, paperPlane, phone } from "../../asserts";

import "./styles.css";

export default function index() {
  const extra = [
    {
      name: "Brands",
    },
    {
      name: "Gift Certificates",
    },
    {
      name: "Affiliate",
    },
    {
      name: "Specials",
    },
    {
      name: "Site Map",
    },
  ];

  const information = [
    {
      name: "About Us",
    },
    {
      name: "Privacy Policy",
    },
    {
      name: "Terms & Conditions",
    },
    {
      name: "Contact Us",
    },
  ];

  const myAccount = [
    {
      name: "My Account",
    },
    {
      name: "Order History",
    },
    {
      name: "Cart",
    },
    {
      name: "Newsletter",
    },
    {
      name: "Returns",
    },
  ];

  const contactUs = [
    {
      name: "SRMS CET",
      image: location,
    },
    {
      name: "pfc@gmail.com",
      image: mail,
    },
    {
      name: "+91 98765 43210",
      image: phone,
    },
    {
      name: "Jhumka City, Bareilly",
      image: paperPlane,
    },
  ];

  return (
    <footer className="footer">
      <div className="container text-center text-md-left mt-5">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">EXTRAS</h6>
            <hr
              className="footer-hr accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            {extra.map((item) => (
              <p className="footer-p">
                <a className="footer-a" href="#!">
                  {item.name}
                </a>
              </p>
            ))}
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">INFORMATION</h6>
            <hr
              className="footer-hr accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />

            {information.map((item) => (
              <p className="footer-p">
                <a className="footer-a" href="#!">
                  {item.name}
                </a>
              </p>
            ))}
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">MY ACCOUNT</h6>
            <hr
              className="footer-hr accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            {myAccount.map((item) => (
              <p className="footer-p">
                <a className="footer-a" href="#!">
                  {item.name}
                </a>
              </p>
            ))}
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">CONTACT US</h6>
            <hr
              className="footer-hr accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            {contactUs.map((item) => (
              <div className="contact">
                <img src={item.image} className="footer-img" />
                <p className="footer-p">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
