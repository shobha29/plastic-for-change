import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/layout";
import { isAuthenticated } from "../../utils/apiAuth";
import { getProducts, deleteProduct } from "../../utils/apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on products"
      classname="container"
      backgroundClassName="manageProduct"
    >
      {goBack()}
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />
          <ul className="list-group">
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong style={{ flex: 1 }}>{p.name}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill mr-5">
                    Update
                  </span>
                </Link>
                <span
                  onClick={() => destroy(p._id)}
                  className="badge badge-danger badge-pill"
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
      {goBack()}
    </Layout>
  );
};

export default ManageProducts;
