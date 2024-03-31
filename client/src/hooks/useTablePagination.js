import { useDispatch } from "react-redux";

export const useTablePagination = (getPaginationItems, userEmail) => {
    const dispatch = useDispatch();

    const handleTableChange = (pagination, extra) => {
        if (extra.action === "paginate") {
            dispatch(
                getPaginationItems(
                    userEmail ? { email: userEmail, page: pagination.current - 1 } : pagination.current - 1
                )
            );
        }
    };

    return handleTableChange;
};
