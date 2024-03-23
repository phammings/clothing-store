import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import { MENU } from "../../../../../constants/routeConstants";
import "./SliderBrandsItem.css";


const SliderBrandsItem = ({ brands }) => {
    return (
        <Row>
            {brands.map((brand, index) => (
                <Col span={6} key={index} className={"slider-brand-item"}>
                    <Link className={"slider-brand-item-link"} to={{ pathname: MENU, state: { id: brand.name } }} />
                    <img style={{ width: "80%" }} src={brand.url} alt={brand.name} />
                </Col>
            ))}
        </Row>
    );
};

export default SliderBrandsItem;
