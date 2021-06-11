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

  return (
    <footer className="footer">
      <div className="container text-center text-md-left mt-5">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">EXTRAS</h6>
            <hr
              className="footer-hr deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            <p className="footer-p">
              <a className="footer-a" href="#!">
                Brands
              </a>
            </p>
            <p className="footer-p">
              <a className="footer-a" href="#!">
                Gift Certificates
              </a>
            </p>
            <p className="footer-p">
              <a className="footer-a" href="#!">
                Affiliate
              </a>
            </p>
            <p className="footer-p">
              <a className="footer-a" href="#!">
                Specials
              </a>
            </p>
            <p className="footer-p">
              <a className="footer-a" href="#!">
                Site Map
              </a>
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">INFORMATION</h6>
            <hr
              className="footer-hr deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            <p className="footer-p">
              <a className="footer-a" href="#!">
                About Us
              </a>
            </p>
            <p className="footer-p">
              <a className="footer-a" href="#!">
                Privacy Policy
              </a>
            </p>
            <p className="footer-p">
              <a className="footer-a" href="#!">
                Terms &amp; Conditions
              </a>
            </p>
            <p className="footer-p">
              <a className="footer-a" href="#!">
                Contact Us
              </a>
            </p>
            <p className="footer-p">
              <a className="footer-a" href="#!">
                Site Map
              </a>
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">MY ACCOUNT</h6>
            <hr
              className="footer-hr deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            <p className="footer-p">
              <a className="footer-a" href="#!">
                My Account
              </a>
            </p>
            <p className="footer-p">
              <a className="footer-a" href="#!">
                Order History
              </a>
            </p>
            <p className="footer-p">
              <a className="footer-a" href="#!">
                Wish List
              </a>
            </p>
            <p className="footer-p">
              <a className="footer-a" href="#!">
                Newsletter
              </a>
            </p>
            <p className="footer-p">
              <a className="footer-a" href="#!">
                Returns
              </a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase font-weight-bold">CONTACT US</h6>
            <hr
              className="footer-hr deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            <div className="contact">
              <img src={location} className="footer-img" />
              {/* <div> */}
              <p className="footer-p">SRMS CET</p>
              {/* </div> */}
            </div>

            <div className="contact">
              <img src={mail} className="footer-img" />
              <p className="footer-p">plasticForChange@gmail.com</p>
            </div>

            <div className="contact">
              <img src={phone} className="footer-img" />
              <p className="footer-p">+91 98765 43210</p>
            </div>

            <div className="contact">
              <img src={paperPlane} className="footer-img" />
              <p className="footer-p">Jhumka City, Bareilly</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
