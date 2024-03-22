import React from "react";
import { Radio } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const MenuSorter = ({ onChange, sortByPrice }) => {
    return (
        <Radio.Group value={sortByPrice} onChange={onChange} style={{ float: "right" }}>
            <Radio.Button style={{ backgroundColor: "#ffffff", color: "rgba(0, 0, 0, 0.85)", cursor: "auto" }} disabled>
                Sort by price
            </Radio.Button>
            <Radio.Button value={false}>
                <ArrowDownOutlined />
            </Radio.Button>
            <Radio.Button value={true}>
                <ArrowUpOutlined />
            </Radio.Button>
        </Radio.Group>
    );
};

export default MenuSorter;