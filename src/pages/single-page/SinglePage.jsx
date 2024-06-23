import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../context/api/productApi";
import defaultImg from "../../assets/defaultImage.jpg";
import "./SinglePage.scss";

const SinglePage = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(productId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;

  return (
    <main>
      <div className="single">
        <div className="single__img">
          <img src={data?.data?.urls[0] || defaultImg} alt="Product" />
        </div>
        <div className="single__context">
          <h1>{data?.data?.title}</h1>
          <p>{data?.data?.description}</p>
          <h4>Category: {data?.data?.category}</h4>
          <div className="single__context-prices">
            <h2>
              {data?.data?.price} USD / {data?.data?.units}
            </h2>
            <h4>{data?.data?.oldPrice} USD</h4>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SinglePage;
