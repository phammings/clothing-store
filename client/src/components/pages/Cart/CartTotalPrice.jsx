import React from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";

import { selectTotalPrice } from "../../redux-toolkit/cart/cart-selector";

const CartTotalPrice = () => {
    const totalPrice = useSelector(selectTotalPrice);

    return <Typography.Title level={3}>Total: $ {totalPrice}</Typography.Title>;
};

export default CartTotalPrice;
