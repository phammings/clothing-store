import React, { memo } from "react";
import { Col, Typography } from "antd";



const CartItemInfo = memo(({ cloth }) => {

    return (
        <>
            <Col span={8} className={"cart-item-image"}>
                <img src={cloth.filename} alt={cloth.title} style={{ height: 100 }} />
            </Col>
            <Col span={8}>
                <Typography.Title level={3}>{cloth.clother}</Typography.Title>
                <Typography.Title level={5}>{cloth.title}</Typography.Title>
                <Typography.Text strong>{cloth.volume} ml.</Typography.Text>
            </Col>
        </>
    );
});

export default CartItemInfo;
