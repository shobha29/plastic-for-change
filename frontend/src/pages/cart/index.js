import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Layout, Card } from "../../components";
import { getCart } from "../../helpers/cartHelpers";

import Checkout from "./checkout";

const Cart = ({ history }) => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => (
    <div>
      <h2>{`Your cart has ${items.length} items`}</h2>
      <hr />
      <div className="row">
        {items.map((product, i) => (
          <div className="col-6 mb-4" key={i}>
            <Card
              history={history}
              product={product}
              showAddButton={false}
              cartUpdate={true}
              showRemoveProduct={true}
              setRun={setRun}
              run={run}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue Shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage Your cart items. Add remove checkout or continue shopping"
      classname="container-fluid"
      backgroundClassName="cart"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
          <h2>Your cart Summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
