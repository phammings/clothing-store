import { Col, Row } from "antd";
import React from "react";

import "./CarouselItem.css";

const CarouselItem = ({ brands }) => {
    return (
        <Row>
            {brands.map((brand, index) => (
                <Col span={6} key={index} className={"slider-brand-item"}>
                    <img style={{ width: "80%" }} src={brand.url} alt={brand.name} />
                </Col>
            ))}
        </Row>
    );
};

export default CarouselItem;
