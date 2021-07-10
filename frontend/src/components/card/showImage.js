import React from "react";

import { API } from "../../config";

const ShowImage = ({ item, url, history, productId }) => {
  const isSamePath = history.location.pathname === `/product/${productId}`;

  return (
    <div className="product-img mb-3 d-flex justify-content-center">
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        style={
          isSamePath
            ? { width: "100%", height: "100%" }
            : { width: "250px", height: "250px" }
        }
      />
    </div>
  );
};

export default ShowImage;
