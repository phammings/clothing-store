import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Col, Row, Table } from "antd";
import { InfoCircleOutlined, ShoppingOutlined } from "@ant-design/icons";

import {
    selectIsOrderLoaded,
    selectIsOrderLoading,
    selectOrder,
    selectOrderItems
} from "../../../../state-redux/order/order-selector";
import { fetchOrderById, fetchOrderItemsByOrderId } from "../../../../state-redux/order/order-thunks";
import { resetOrderState } from "../../../../state-redux/order/order-slice";
import ContentTitle from "../../../ContentTitle/ContentTitle";
import Spinner from "../../../Spinner/Spinner";
import AccountDataItem from "../../../AccountDataItem/AccountDataItem";
import { OrderItemResponse } from "../../../../constants/types/types";
import "./ManageUserOrder.css";

const ManageUserOrder = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // Correct usage of useParams here
    const order = useSelector(selectOrder);
    const orderItems = useSelector(selectOrderItems);
    const isOrderLoading = useSelector(selectIsOrderLoading);
    const isOrderLoaded = useSelector(selectIsOrderLoaded);
    const { email, firstName, lastName, totalPrice, creditCard, phoneNumber, date, city, address } = order;

    useEffect(() => {
        dispatch(fetchOrderById(id)); // Using id directly
        return () => {
            dispatch(resetOrderState());
        };
    }, [dispatch, id]); // Include dependencies

    useEffect(() => {
        if (isOrderLoaded) {
            dispatch(fetchOrderItemsByOrderId(id)); // Using id directly
        }
    }, [dispatch, id, isOrderLoaded]); // Include dependencies

    return (
        <>
            {isOrderLoading ? (
                <Spinner />
            ) : (
                <>
                    <div style={{ textAlign: "center" }}>
                        <ContentTitle title={`Order #${id}`} titleLevel={4} icon={<ShoppingOutlined />} />
                    </div>
                    <Row>
                        <Col span={24}>
                            <Card>
                                <Row gutter={32}>
                                    <Col span={12}>
                                        <InfoCircleOutlined className={"manage-user-icon"} />
                                        <ContentTitle title={"Customer information"} titleLevel={5} />
                                        <AccountDataItem title={"First name"} text={firstName} />
                                        <AccountDataItem title={"Last name"} text={lastName} />
                                        <AccountDataItem title={"City"} text={city} />
                                        <AccountDataItem title={"Address"} text={address} />
                                        <AccountDataItem title={"Email"} text={email} />
                                        <AccountDataItem title={"Phone number"} text={phoneNumber} />
                                        <AccountDataItem title={"Credit card"} text={creditCard} />
                                    </Col>
                                    <Col span={12}>
                                        <InfoCircleOutlined className={"manage-user-icon"} />
                                        <ContentTitle title={"Order information"} titleLevel={5} />
                                        <AccountDataItem title={"Order id"} text={id} />
                                        <AccountDataItem title={"Date"} text={date} />
                                        <ContentTitle title={`Order summary: ${totalPrice}.0 $`} titleLevel={4} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 16 }}>
                                    <Col span={24}>
                                        <Table
                                            rowKey={"id"}
                                            pagination={false}
                                            dataSource={orderItems}
                                            columns={[
                                                {
                                                    title: "Cloth Id",
                                                    dataIndex: "id",
                                                    key: "id"
                                                },
                                                {
                                                    title: "Cloth Brand",
                                                    dataIndex: "clother",
                                                    key: "clother",
                                                    render: (_, order) => order.cloth.clother
                                                },
                                                {
                                                    title: "Cloth Name",
                                                    dataIndex: "title",
                                                    key: "title",
                                                    render: (_, order) => order.cloth.title
                                                },
                                                {
                                                    title: "Quantity",
                                                    dataIndex: "quantity",
                                                    key: "quantity"
                                                },
                                                {
                                                    title: "Price",
                                                    dataIndex: "price",
                                                    key: "price",
                                                    render: (_, order) => `${order.cloth.price}.0 $`
                                                },
                                                {
                                                    title: "Amount",
                                                    dataIndex: "amount",
                                                    key: "amount",
                                                    render: (_, order) => `${order.amount}.0 $`
                                                }
                                            ]}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ManageUserOrder;
