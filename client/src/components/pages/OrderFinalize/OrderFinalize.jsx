import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "antd";

import { selectOrder } from "../../../state-redux/order/order-selector";
import { resetCartState } from "../../../state-redux/cart/cart-slice";
import ContentWrapper from "../../ContentWrapper/ContentWrapper";

const OrderFinalize = () => {
    const dispatch = useDispatch();
    const order = useSelector(selectOrder);

    useEffect(() => {
        dispatch(resetCartState());
    }, []);

    return (
        <ContentWrapper>
            <div style={{ textAlign: "center" }}>
                <Typography.Title level={2}>Thank you for the order!</Typography.Title>
                <Typography.Text>Your order number is: {order.id}</Typography.Text>
            </div>
        </ContentWrapper>
    );
};

export default OrderFinalize;
