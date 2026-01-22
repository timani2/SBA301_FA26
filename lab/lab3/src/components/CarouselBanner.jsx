import React from "react";
import { Carousel, Image } from "react-bootstrap";
import banners from "../data/banners";

const CarouselBanner = () => {
  return (
    <div className="home-page">
      {/* 1. Phần Carousel (Slider) */}
      <Carousel fade interval={3000} className="mb-5">
        {banners.map((banner) => (
          <Carousel.Item key={banner.id}>
            <Image
              className="d-block w-100"
              src={banner.image}
              alt={banner.title}
              style={{ objectFit: "cover", maxHeight: "450px" }}
            />
            <Carousel.Caption
              style={{ background: "rgba(0,0,0,0.4)", borderRadius: "10px" }}
            >
              <h3>{banner.title}</h3>
              <p>{banner.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselBanner;
