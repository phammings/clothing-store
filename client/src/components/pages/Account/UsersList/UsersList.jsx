import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TeamOutlined } from "@ant-design/icons";
import { Table } from "antd";

import {
    selectAdminStateUsers,
    selectIsAdminStateLoading,
    selectTotalElements
} from "../../../../state-redux/admin/admin-selector";
import { fetchAllUsers } from "../../../../state-redux/admin/admin-thunks";
import ContentTitle from "../../../ContentTitle/ContentTitle";
import { LoadingStatus } from "../../../../constants/types/types";
import { ACCOUNT_ADMIN_USERS } from "../../../../constants/routeConstants";
import { resetAdminState } from "../../../../state-redux/admin/admin-slice";
import { useTablePagination } from "../../../../hooks/useTablePagination";

const UsersList = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectAdminStateUsers);
    const isLoading = useSelector(selectIsAdminStateLoading);
    const totalElements = useSelector(selectTotalElements);
    const handleTableChange = useTablePagination(fetchAllUsers);

    useEffect(() => {
        dispatch(fetchAllUsers(0));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);

    return (
        <div>
            <ContentTitle title={"List of all users"} titleLevel={4} icon={<TeamOutlined />} />
            <Table
                rowKey={"id"}
                onChange={handleTableChange}
                loading={isLoading}
                pagination={{
                    total: totalElements,
                    position: ["bottomRight", "topRight"]
                }}
                dataSource={users}
                columns={[
                    {
                        title: "Id",
                        dataIndex: "id",
                        key: "id"
                    },
                    {
                        title: "First name",
                        dataIndex: "firstName",
                        key: "firstName"
                    },
                    {
                        title: "E-mail",
                        dataIndex: "email",
                        key: "email"
                    },
                    {
                        title: "Role",
                        dataIndex: "roles",
                        key: "roles",
                        render: (_, user) => user.roles[0]
                    },
                    {
                        title: "Provider",
                        dataIndex: "provider",
                        key: "provider"
                    },
                    {
                        title: "Action",
                        dataIndex: "amount",
                        key: "amount",
                        render: (_, user) => (
                            <Link to={`${ACCOUNT_ADMIN_USERS}/${user.id}`}>Show more</Link>
                        )
                    }
                ]}
            />
        </div>
    );
};

export default UsersList;
