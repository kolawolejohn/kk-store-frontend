import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);
console.log(error);
  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="KK Store"
      description="Discover the world of ecommerce... Here to serve you better"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell && productsBySell.map((product, index) => (
          <div className="col-4 mb-3">
            <Card key={index} product={product} />
          </div>
        ))}
      </div>
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival && productsByArrival.map((product, index) => (
          <div key={index} className="col-4 mb-3">
            <Card key={index} product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
