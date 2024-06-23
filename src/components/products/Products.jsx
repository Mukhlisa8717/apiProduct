import React, { useEffect, useState } from "react";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../../context/api/productApi";
import defaultImg from "../../assets/defaultImage.jpg";
import "./Products.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductDetail from "../productDetail/ProductDetail";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localDetailData, setLocalDetailData] = useState(null);
  const navigate = useNavigate();
  let id = searchParams.get("detail");

  const { data: detailData } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    setLocalDetailData(detailData);
  }, [detailData]);

  const { data } = useGetProductsQuery({ limit: 100 });

  useEffect(() => {
    if (!id) {
      setSearchParams({});
    }
  }, [id, setSearchParams]);

  const closeDetailModel = () => {
    setSearchParams({});
     setLocalDetailData(null);
  };

  const handleImageClick = (productId) => {
    setSearchParams({ detail: productId });
  };

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  let productItem = data?.data?.products?.map((product) => (
    <div className="card" key={product.id}>
      <div className="card__img" onClick={() => handleImageClick(product.id)}>
        <img
          src={product.urls[0] ? product.urls[0] : defaultImg}
          width={200}
          alt="image"
        />
      </div>
      <div
        className="card__context"
        onClick={() => handleCardClick(product.id)}
      >
        <h3>{product.title}</h3>
        <p>{product.category}</p>
        <p>{product.units}</p>
      </div>
    </div>
  ));
  return (
    <div className="wrapper">
      {productItem}
      {localDetailData ? (
        <ProductDetail
          detailData={localDetailData}
          closeDetailModel={closeDetailModel}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Products;
