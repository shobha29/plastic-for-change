import React, { useState, useEffect } from "react";

import { Layout, Card } from "../../components";
import { getProducts } from "../../utils/apiCore";

import Search from "./search";

const Home = ({ history }) => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="Plastic Buying website"
      classname="container-fluid"
    >
      <Search />

      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-lg-3 col-sm-12 col-md-6 mb-3">
            <Card history={history} product={product} />
          </div>
        ))}
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <div key={i} className="col-lg-3 col-sm-12 col-md-6 mb-3">
            <Card history={history} product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
