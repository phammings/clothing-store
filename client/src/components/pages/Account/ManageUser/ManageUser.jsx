import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Table } from "antd";

import { selectAdminStateUser, selectIsAdminStateLoading } from "../../../../state-redux/admin/admin-selector";
import { selectOrders, selectTotalElements } from "../../../../state-redux/orders/orders-selector";
import { fetchUserInfo } from "../../../../state-redux/admin/admin-thunks";
import { resetOrders } from "../../../../state-redux/orders/orders-slice";
import { resetAdminState } from "../../../../state-redux/admin/admin-slice";
import { LoadingStatus } from "../../../../constants/types/types";
import { fetchUserOrdersByEmail } from "../../../../state-redux/orders/orders-thunks";
import Spinner from "../../../Spinner/Spinner";
import ContentTitle from "../../../ContentTitle/ContentTitle";
import AccountDataItem from "../../../AccountDataItem/AccountDataItem";
import { ACCOUNT_USER_ORDERS } from "../../../../constants/routeConstants";
import { useTablePagination } from "../../../../hooks/useTablePagination";

const ManageUser = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // Correct usage of useParams here
    const userData = useSelector(selectAdminStateUser);
    const userOrders = useSelector(selectOrders);
    const totalElements = useSelector(selectTotalElements);
    const isUserLoading = useSelector(selectIsAdminStateLoading);
    const handleTableChange = useTablePagination(fetchUserOrdersByEmail,{ email: userData.email, page: 0 }); 
    const { email, firstName, lastName, city, address, phoneNumber, creditCard, provider, roles } = userData;

    useEffect(() => {
        dispatch(fetchUserInfo(id)); // Using id directly

        return () => {
            dispatch(resetOrders());
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, [dispatch, id]); // Include dependencies

    useEffect(() => {
        if (userData.email) {
            dispatch(fetchUserOrdersByEmail({ email: userData.email, page: 0 }));
        }
    }, [dispatch, userData.email]); // Include dependencies

    return (
        <>
            {isUserLoading ? (
                <Spinner />
            ) : (
                <>
                    <ContentTitle title={`User: ${firstName} ${lastName}`} titleLevel={4} icon={<UserOutlined />} />
                    <Row>
                        <Col span={24}>
                            <Card>
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <AccountDataItem title={"User id"} text={id} />
                                        <AccountDataItem title={"Email"} text={email} />
                                        <AccountDataItem title={"Role"} text={roles} />
                                        <AccountDataItem title={"First name"} text={firstName} />
                                        <AccountDataItem title={"Last name"} text={lastName} />
                                    </Col>
                                    <Col span={8}>
                                        <AccountDataItem title={"Provider"} text={provider} />
                                        <AccountDataItem title={"City"} text={city} />
                                        <AccountDataItem title={"Address"} text={address} />
                                        <AccountDataItem title={"Phone number"} text={phoneNumber} />
                                        <AccountDataItem title={"Credit card"} text={creditCard} />
                                    </Col>
                                </Row>
                            </Card>
                            <Row style={{ marginTop: 16 }}>
                                <Col span={24}>
                                    {userOrders.length === 0 ? (
                                        <div style={{ textAlign: "center" }}>
                                            <ContentTitle title={"No orders"} titleLevel={4} />
                                        </div>
                                    ) : (
                                        <>
                                            <div style={{ textAlign: "center" }}>
                                                <ContentTitle title={"Orders"} titleLevel={4} />
                                            </div>
                                            <Table
                                                rowKey={"id"}
                                                onChange={handleTableChange}
                                                pagination={{
                                                    total: totalElements,
                                                    position: ["bottomRight", "topRight"]
                                                }}
                                                dataSource={userOrders}
                                                columns={[
                                                    {
                                                        title: "Order №",
                                                        dataIndex: "id",
                                                        key: "id"
                                                    },
                                                    {
                                                        title: "Date",
                                                        dataIndex: "date",
                                                        key: "date"
                                                    },
                                                    {
                                                        title: "City",
                                                        dataIndex: "city",
                                                        key: "city"
                                                    },
                                                    {
                                                        title: "Address",
                                                        dataIndex: "address",
                                                        key: "address"
                                                    },
                                                    {
                                                        title: "Credit card",
                                                        dataIndex: "creditCard",
                                                        key: "creditCard"
                                                    },
                                                    {
                                                        title: "Order Summary",
                                                        dataIndex: "totalPrice",
                                                        key: "totalPrice",
                                                        render: (_, order) => `${order.totalPrice}.0 $`
                                                    },
                                                    {
                                                        title: "Actions",
                                                        dataIndex: "actions",
                                                        key: "actions",
                                                        render: (_, order) => (
                                                            <Link to={`${ACCOUNT_USER_ORDERS}/${order.id}`}>
                                                                Show more
                                                            </Link>
                                                        )
                                                    }
                                                ]}
                                            />
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ManageUser;
