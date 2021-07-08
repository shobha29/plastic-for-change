import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { checkmark } from "../../asserts";
import { EMAIL_REGEX } from "../../constants";

const ForgotPassword = ({ showForgotPassword, setShowForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validateEmail = (input) => {
    if (input.match(EMAIL_REGEX)) {
      return true;
    } else {
      return false;
    }
  };

  const handleSend = (email) => {
    if (email === "") {
      setError({ isError: true, message: "Please enter email address" });
    } else if (validateEmail(email)) {
      setIsEmailSent(true);
    } else {
      setError({ isError: true, message: "Invalid email address." });
    }
  };

  const handleClose = () => {
    setEmail("");
    setError({ isError: false, message: "" });
    setIsEmailSent(false);
    setShowForgotPassword(false);
  };

  return (
    <Modal
      show={showForgotPassword}
      onHide={() => handleClose()}
      animation={false}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Forgot Password?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isEmailSent ? (
          <div
            className="border border-success rounded p-2 d-flex"
            style={{ background: "#daf7db" }}
          >
            <img
              src={checkmark}
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",
              }}
            />
            <p className="text-success">
              An email has been sent to{" "}
              <span className="font-weight-bold">
                {email.substr(0, 2)}********
                {email.split("@")[0].substr(-2)}@{email.split("@").pop()}
              </span>{" "}
              email address. Follow the instruction in the email to reset your
              password.
            </p>
          </div>
        ) : (
          <div className="form-group d-flex flex-column">
            <label className="text-muted">Email</label>
            <input
              onChange={(e) => {
                setError(false);
                setEmail(e.target.value);
              }}
              type="email"
              className="form-control"
              value={email}
            />
            {error.isError && (
              <p className="text-danger align-self-end font-weight-bold">
                **{error.message}
              </p>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isEmailSent ? (
          <Button
            onClick={() => {
              setIsEmailSent(false);
              setEmail("");
            }}
          >
            Use another email
          </Button>
        ) : (
          <Button onClick={() => handleSend(email)}>Send</Button>
        )}
        <Button onClick={() => handleClose()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ForgotPassword;
