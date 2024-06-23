import React from "react";
import Model from "../model/Model";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation"; 
import "swiper/css/pagination"; 
import "./ProductDetail.scss"; 
// import defaultImg from "../../assets/defaultImage.jpg";

const ProductDetail = ({ detailData, closeDetailModel }) => {
  return (
    <Model close={closeDetailModel}>
      <div className="product-detail">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation 
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]} 
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {detailData?.data?.urls?.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Slide ${index + 1}`} width={200} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Model>
  );
};

export default ProductDetail;
