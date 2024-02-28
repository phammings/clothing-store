import React from "react";

const SearchClothes= {
    BRAND: "BRAND",
    CLOTHES_TITLE: "CLOTHES_TITLE",
};

const searchByData = [
    { label: "Brand", value: SearchClothes.BRAND },
    { label: "Clothing title", value: SearchClothes.CLOTHES_TITLE },
];

const SelectSearchData = ({ handleChangeSelect }) => {
    return (
        <select defaultValue={SearchClothes.BRAND} onChange={handleChangeSelect} style={{ width: 250 }}>
            {searchByData.map((value, index) => (
                <option key={index} value={value.value}>
                    {value.label}
                </option>
            ))}
        </select>
    );
};

export default SelectSearchData;