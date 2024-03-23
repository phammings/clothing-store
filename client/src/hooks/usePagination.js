import { useState } from "react";
import { useSelector } from "react-redux";

import { selectTotalElements } from "../state-redux/clothes/clothes-selector";

export const MAX_PAGE_VALUE = 15;

export const usePagination = () => {
    const totalElements = useSelector(selectTotalElements);
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePagination = (page, pageSize) => {
        setCurrentPage(page);
    };

    const resetPagination = () => {
        setCurrentPage(1);
    };

    return { currentPage, totalElements, handleChangePagination, resetPagination };
};
