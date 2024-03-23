import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "antd";

import { fetchClothesByInputText } from "../state-redux/clothes/clothes-thunks";

export const useSearch = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [searchTypeValue, setSearchTypeValue] = useState("BRAND");
    const [searchValue, setSearchValue] = useState("");

    const handleChangeSelect = (value) => {
        setSearchTypeValue(value);
    };

    const onSearch = (data) => {
        setSearchValue(data.searchValue);
        dispatch(fetchClothesByInputText({ searchType: searchTypeValue, text: data.searchValue, currentPage: 0 }));
    };

    const resetFields = () => {
        form.resetFields();
    };

    return { searchValue, searchTypeValue, form, resetFields, handleChangeSelect, onSearch };
};
