import React from "react";
import { Select } from "antd";
import {SearchCloth} from "../../constants/types/types";

const searchByData = [
    { label: "Brand", value: SearchCloth.BRAND },
    { label: "Cloth title", value: SearchCloth.TITLE },
    { label: "Manufacturer country", value: SearchCloth.COUNTRY }
];

const SelectSearchData = ({ handleChangeSelect }) => {
    return (
        <Select defaultValue={SearchCloth.BRAND} onChange={handleChangeSelect} style={{ width: 250 }}>
            {searchByData.map((value, index) => (
                <Select.Option key={index} value={value.value}>
                    {value.label}
                </Select.Option>
            ))}
        </Select>
    );
};

export default SelectSearchData;
