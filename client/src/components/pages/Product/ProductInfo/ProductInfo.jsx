import React from "react";
import { Button, Col, Divider, Rate, Row, Space, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import Description from "./Description/Description";

const ProductInfo = ({ cloth, reviewsLength, addToCart }) => {
    return (
        <Row>
            <Col span={12} className={"product-image-wrapper"}>
                <img src={cloth?.filename} alt={cloth?.title} className={"product-image"} />
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
                        <Description title={"Gender:"} />
                        <Description title={"Volume:"} />
                        <Description title={"Release year:"} />
                        <Description title={"Manufacturer country:"} />
                        <Description title={"Top notes:"} />
                        <Description title={"Heart notes:"} />
                        <Description title={"Base notes:"} />
                    </Col>
                    <Col span={16}>
                        <Description title={cloth?.clothGender} />
                        <Description title={`${cloth?.volume} ml.`} />
                        <Description title={cloth?.year} />
                        <Description title={cloth?.country} />
                        <Description title={cloth?.fragranceTopNotes} />
                        <Description title={cloth?.fragranceMiddleNotes} />
                        <Description title={cloth?.fragranceBaseNotes} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ProductInfo;
