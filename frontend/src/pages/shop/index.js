import React, { useState, useEffect } from "react";

import { Layout } from "../../components";
import { getCategories } from "../../utils/apiAdmin";
import { getFilteredProducts } from "../../utils/apiCore";

import Card from "../home/card";

import Checkbox from "./checkbox";
import Radiobox from "./radiobox";
import { prices } from "./fixedPrices";

const Shop = ({ history }) => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResult, setFilteredResult] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResult = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResult(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResult([...filteredResult, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResult(skip, limit, myFilters.filters);
  }, []);

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResult(myFilters.filters);
    setMyFilters(newFilters);
  };

  return (
    <Layout
      title="Shop"
      description="Search and find the product of your choice"
      classname="container-fluid"
      backgroundClassName="shop"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by Categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter by Price range</h4>
          <div>
            <Radiobox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResult.map((product, i) => (
              <div key={i} className="col-4 mb-3">
                <Card history={history} product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
