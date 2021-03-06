import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import moment from "moment";

import { addItem, removeItem, updateItem } from "../../helpers/cartHelpers";
import ShowImage from "./showImage";

const Card = ({
  history,
  product,
  showProductButton = true,
  showAddButton = true,
  cartUpdate = false,
  showRemoveProduct = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showProductButton) =>
    showProductButton && (
      <Link to={`/product/${product._id}`} className="mr-2">
        <button className="btn btn-outline-primary mt-2 mb-2">
          View Product
        </button>
      </Link>
    );

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartButton = (showAddButton) =>
    showAddButton &&
    (product.quantity > product.sold ? (
      <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
        Add to cart
      </button>
    ) : (
      <button
        onClick={addToCart}
        className="btn btn-secondary mt-2 mb-2"
        disabled
        style={{ opacity: 0.4, cursor: "not-allowed" }}
      >
        Add to cart
      </button>
    ));

  const showRemoveProductButton = (showRemoveProduct) =>
    showRemoveProduct && (
      <button
        onClick={() => {
          removeItem(product._id);
          setRun(!run);
        }}
        className="btn btn-outline-danger mt-2 mb-2"
      >
        Remove Product
      </button>
    );

  const showStock = (product) => {
    return product.quantity > product.sold ? (
      <span className="badge badge-success badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock</span>
    );
  };

  const handleChange = (productId, productQuantity) => (e) => {
    const value =
      e.target.value < 1
        ? 1
        : e.target.value > productQuantity
        ? productQuantity
        : e.target.value;

    setRun(!run);
    setCount(value);
    if (e.target.value >= 1) {
      updateItem(productId, value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>

            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id, product.quantity)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <div
      className="card"
      style={{
        boxShadow: "2px 2px 10px 1px #10471c",
      }}
    >
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <div>
          <ShowImage
            item={product}
            url="product"
            history={history}
            productId={product._id}
          />
        </div>
        <p className="lead mt-2">
          {history.location.pathname === `/product/${product._id}`
            ? product.description
            : `${product.description.substring(0, 20)}...`}
        </p>
        <p className="black-10">{`???${product.price}`}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>

        {showStock(product)}
        <br />
        {showViewButton(showProductButton)}

        {showAddToCartButton(showAddButton)}

        {showRemoveProductButton(showRemoveProduct)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default withRouter(Card);
