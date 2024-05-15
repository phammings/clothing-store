import React from "react";
import { Card, Col, Typography } from "antd";

import "./OrderItem.css";

const OrderItem = ({ cloth, quantity }) => {
    const imageUrl = `http://localhost:8080/static/assets/images/${cloth.filename}`;
    return (
        <Col span={12}>
            <Card
                className={"menu-card"}
                cover={<img className={"menu-card-image"} alt={cloth.title} src={imageUrl} />}
            >
                <div className={"menu-content"}>
                    <Typography.Text strong>{cloth.clother}</Typography.Text>
                    <Typography.Text strong>{cloth.title}</Typography.Text>
                    <Typography.Text strong>Price: $ {cloth.price}</Typography.Text>
                    <Typography.Text strong>Quantity: {quantity}</Typography.Text>
                </div>
            </Card>
        </Col>
    );
};

export default OrderItem;
