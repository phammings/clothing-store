import React, { useState, useEffect } from "react";
import { Card, Col, InputNumber, Row, Typography } from "antd";
import RemoveButton from "./RemoveButton";
import CartItemInfo from "./CartItemInfo";

const CartItem = ({
    cloth,
    clothInCart,
    onChangeClothItemCount,
    deleteFromCart
}) => {
    const [clothCount, setClothCount] = useState(1);

    useEffect(() => {
        setClothCount(clothInCart);
    }, []);

    const handleClothesCount = (value) => {
        setClothCount(value);
        onChangeClothItemCount(cloth.id, value);
    };
    const imageUrl = `http://localhost:8080/static/assets/images/${cloth.filename}`;

    return (
        <Card className="cart-item">
            <Row gutter={16}>
                <CartItemInfo cloth={cloth} />
                <Col span={8}>
                    <Row gutter={8}>
                        <Col span={12}>
                            <InputNumber
                                min={1}
                                max={99}
                                value={clothCount}
                                onChange={handleClothesCount}
                            />
                        </Col>
                        <Col span={12}>
                            <RemoveButton clothId={cloth.id} deleteFromCart={deleteFromCart} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Typography.Title level={4}>${cloth.price * clothCount}</Typography.Title>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default CartItem;
