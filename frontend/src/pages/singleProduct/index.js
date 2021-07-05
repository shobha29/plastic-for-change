import React, { useState, useEffect } from "react";

import { Layout, Card } from "../../components";
import { read, listRelated } from "../../utils/apiCore";

const SingleProduct = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  const { history } = props;

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);

        //fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProducts(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      classname="container-fluid"
      backgroundClassName="viewProduct"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card
              history={history}
              product={product}
              showProductButton={false}
            />
          )}
        </div>
        <div className="col-4">
          <h4>Related Products</h4>
          {relatedProducts.map((product, i) => (
            <div key={i} className="mb-3">
              <Card history={history} product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
