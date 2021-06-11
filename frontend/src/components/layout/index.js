import React from "react";

import Menu from "../menu";
import "../../styles.css";

const Layout = ({
  title = "Title",
  description = "Description",
  classname,
  children,
  backgroundClassName = "",
}) => {
  return (
    <div>
      <Menu />
      <div className={`jumbotron ${backgroundClassName}`}>
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>

      <div className={classname}>{children}</div>
    </div>
  );
};

export default Layout;
