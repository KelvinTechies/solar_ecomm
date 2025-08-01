import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

function Distributor() {
  return (
    <>
      <div className="position-relative w-100" style={{ height: 500 }}>
        {/* Background Image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: 'url("/blog/assets/images/dist.jpg")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark Overlay */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          ></div>
        </div>

        {/* Text Above the Image */}
        <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
          <h3 className="" style={{ zIndex: 1, color: "#11B7EB" }}>
            Become a Distributor
          </h3>
        </div>
      </div>
      
      <Container className="mt-4">
        <Row className="d-flex align-items-center p-4">
          <Col md={6}>
            <img
              src="/blog/assets/images/cm.jpg"
              alt=""
              style={{ width: "100%", height: "60vh" }}
            />
          </Col>
          <Col md={6}>
            <h3 className="text-center" style={{ color: "#F7C958" }}>
              Become a Distributor of the Solar 4G V380 Camera
            </h3>
            <p style={{ lineHeight: 2, fontSize: 18 }}>
              Maximize Your Profit! Looking to expand your business and earn high
              profits? Become a distributor for our Solar 4G V380 Camera—an
              eco-friendly, high-demand security solution. With our product, you
              can tap into the rapidly growing market of solar-powered security
              cameras and start making money right away.
            </p>
            <p style={{ lineHeight: 2, fontSize: 18 }}>
              With its long-lasting design, 4G connectivity, and low maintenance,
              customers are eager to buy. Recurring Revenue: The camera’s
              durability and solar-powered design mean minimal returns and ongoing
              customer satisfaction. You can count on repeat sales, as your
              customers may return for more units or accessories. The Profit
              Potential is Huge. Are You Ready to Earn? Contact us today to become
              a distributor and start maximizing your profits with the Solar 4G V380 Camera!
            </p>
          </Col>
        </Row>

        <Row className="d-flex align-items-center p-4">
          <Col md={6}>
            <h5 style={{ color: "#11B7EB" }}>
              Why Distribute Our Solar 4G V380 Camera?
            </h5>
            <p style={{ lineHeight: 2, fontSize: 20 }}>
              High Profit Margins: With our competitive wholesale pricing,
              you’ll enjoy healthy margins and the ability to price
              competitively in a growing market. Solar-powered tech is in
              demand, and this camera offers a unique value proposition that
              customers want.
            </p>
            <p style={{ lineHeight: 2, fontSize: 20 }}>
              No Inventory Hassles: Start your distribution business with minimal
              upfront investment. You won’t need to store inventory, and you can
              scale up as you grow. We handle the logistics, so you can focus on
              selling and profiting. Proven Product, Proven Demand: Our Solar 4G
              V380 Camera meets the increasing demand for smart, sustainable security solutions.
            </p>
          </Col>
          <Col md={6}>
            <img
              src="/blog/assets/images/cm.jpg"
              alt=""
              style={{ width: "100%", height: "60vh" }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Distributor;
