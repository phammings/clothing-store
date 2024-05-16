import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingOutlined } from "@ant-design/icons";

import { selectIsOrdersLoading, selectOrders } from "../../../../state-redux/orders/orders-selector";
import { fetchAllUsersOrders } from "../../../../state-redux/orders/orders-thunks";
import { resetOrders } from "../../../../state-redux/orders/orders-slice";
import ContentTitle from "../../../ContentTitle/ContentTitle";
import OrdersTable from "../../../OrdersTable/OrdersTable";

const OrdersList = () => {
    const dispatch = useDispatch();
    const adminOrders = useSelector(selectOrders);
    const isOrderLoading = useSelector(selectIsOrdersLoading);

    useEffect(() => {
        dispatch(fetchAllUsersOrders(0));

        return () => {
            dispatch(resetOrders());
        };
    }, []);

    return (
        <>
            <ContentTitle title={"List of all orders"} titleLevel={4} icon={<ShoppingOutlined />} />
            <OrdersTable orders={adminOrders} loading={isOrderLoading} fetchOrders={fetchAllUsersOrders} />
        </>
    );
};

export default OrdersList;
