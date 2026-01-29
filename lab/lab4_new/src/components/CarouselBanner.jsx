// src/components/CarouselBanner.jsx
import React, { useEffect, useState } from "react";
import { Carousel, Image, Spinner, Container } from "react-bootstrap";
import { OrchidService } from "../service/OrchidService";

const CarouselBanner = () => {
  const [latestOrchids, setLatestOrchids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await OrchidService.getAllOrchids();
        // Sắp xếp theo orchidID giảm dần và lấy 3 hoa mới nhất
        const top3 = data.sort((a, b) => b.orchidID - a.orchidID).slice(0, 3);
        setLatestOrchids(top3);
      } catch (error) {
        console.error("Lỗi tải banner:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading)
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="success" />
      </Container>
    );

  return (
    <Carousel fade interval={3000} className="mb-5 shadow">
      {latestOrchids.map((orchid) => (
        <Carousel.Item key={orchid.orchidID}>
          <Image
            className="d-block w-100"
            src={orchid.orchidURL}
            alt={orchid.orchidName}
            style={{ objectFit: "cover", maxHeight: "500px" }}
          />
          <Carousel.Caption
            style={{ background: "rgba(0,0,0,0.5)", borderRadius: "15px" }}
          >
            <h3>{orchid.orchidName}</h3>
            <p>{orchid.orchidDescription?.substring(0, 100)}...</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselBanner;
