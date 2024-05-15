import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";

import { ACCOUNT_USER_ORDERS } from "../../constants/routeConstants";
import { selectTotalElements } from "../../state-redux/orders/orders-selector";
import { useTablePagination } from "../../hooks/useTablePagination";

const OrdersTable = ({ orders, loading, fetchOrders }) => {
    const totalElements = useSelector(selectTotalElements);
    const handleTableChange = useTablePagination(fetchOrders);

    return (
        <Table
            rowKey={"id"}
            onChange={handleTableChange}
            loading={loading}
            pagination={{
                total: totalElements,
                position: ["bottomRight", "topRight"]
            }}
            dataSource={orders}
            columns={[
                {
                    title: "Order №",
                    dataIndex: "id",
                    key: "id"
                },
                {
                    title: "Date",
                    dataIndex: "date",
                    key: "date",
                    sorter: (a, b) => a.date.localeCompare(b.date)
                },
                {
                    title: "Customer",
                    dataIndex: "firstName",
                    key: "firstName",
                    render: (_, order) => `${order.firstName} ${order.lastName}`
                },
                {
                    title: "Email",
                    dataIndex: "email",
                    key: "email"
                },
                {
                    title: "Sum, $",
                    dataIndex: "totalPrice",
                    key: "totalPrice",
                    sorter: (a, b) => a.totalPrice - b.totalPrice
                },
                {
                    title: "Actions",
                    dataIndex: "operations",
                    key: "operations",
                    render: (_, order) => <Link to={`${ACCOUNT_USER_ORDERS}/${order.id}`}>Show more</Link>
                }
            ]}
        />
    );
};

export default OrdersTable;
