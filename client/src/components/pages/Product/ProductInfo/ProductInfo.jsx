import React from "react";
import { Button, Col, Divider, Rate, Row, Space, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import Description from "./Description/Description";

const ProductInfo = ({ cloth, reviewsLength, addToCart }) => {
    const imageUrl = `http://localhost:8080/static/assets/images/${cloth.filename}`;

    return (
        <Row>
            <Col span={12} className={"product-image-wrapper"}>
                <img src={imageUrl} alt={cloth?.title} className={"product-image"} />
            </Col>
            <Col span={12}>
                <Row className={"product-header"}>
                    <Col>
                        <Typography.Title level={3}>{cloth?.title}</Typography.Title>
                        <Typography.Title level={4}>{cloth?.clother}</Typography.Title>
                        <Typography.Text>{cloth?.type}</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Col className={"product-rate"} span={8}>
                        <Rate allowHalf disabled value={cloth?.clothRating} />
                        <Typography.Text>{reviewsLength} reviews</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Typography.Text type="success">In Stock</Typography.Text>
                </Row>
                <Row style={{ marginTop: 16 }}>
                    <Col span={5}>
                        <Space align={"baseline"}>
                            <Typography.Text>${cloth?.price}.00</Typography.Text>
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Button icon={<ShoppingCartOutlined />} onClick={addToCart}>
                            Add to cart
                        </Button>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}>
                        <Description title={"Title:"} />
                        <Description title={"Gender:"} />
                        <Description title={"Type:"} />
                        <Description title={"Year:"} />
                        <Description title={"Country:"} />
                    </Col>
                    <Col span={8}>
                        <Description title={cloth?.title} />
                        <Description title={cloth?.clothGender} />
                        <Description title={cloth?.type} />
                        <Description title={cloth?.year} />
                        <Description title={cloth?.country} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ProductInfo;
