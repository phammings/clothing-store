import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingOutlined } from "@ant-design/icons";

import { selectIsOrdersLoading, selectOrders } from "../../../../state-redux/orders/orders-selector";
import { fetchUserOrders } from "../../../../state-redux/orders/orders-thunks";
import ContentTitle from "../../../ContentTitle/ContentTitle";
import Spinner from "../../../Spinner/Spinner";
import { resetOrders } from "../../../../state-redux/orders/orders-slice";
import OrdersTable from "../../../OrdersTable/OrdersTable";

const PersonalOrdersList = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const isOrdersLoading = useSelector(selectIsOrdersLoading);

    useEffect(() => {
        dispatch(fetchUserOrders(0));

        return () => {
            dispatch(resetOrders());
        };
    }, []);

    return (
        <>
            {isOrdersLoading ? (
                <Spinner />
            ) : (
                <>
                    {orders.length === 0 ? (
                        <div style={{ textAlign: "center" }}>
                            <ContentTitle title={"You have no orders"} titleLevel={4} icon={<ShoppingOutlined />} />
                        </div>
                    ) : (
                        <>
                            <ContentTitle title={"List of all orders"} titleLevel={4} icon={<ShoppingOutlined />} />
                            <OrdersTable loading={isOrdersLoading} orders={orders} fetchOrders={fetchUserOrders} />
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default PersonalOrdersList;
