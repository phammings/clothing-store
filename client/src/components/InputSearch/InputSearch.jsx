import React from "react";
import { Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import IconButton from "../IconButton/IconButton";

const InputSearch = ({ onSearch, form }) => (
    <Form onFinish={onSearch} form={form} style={{ display: 'flex', alignItems: 'center', marginLeft: "-30px"}}>
        <Input.Group compact style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Item name={"searchValue"} style={{ marginBottom: 0 }}>
                <Input placeholder={"Search..."} style={{ width: 200 }} />
            </Form.Item>
            <IconButton title={"Search"} icon={<SearchOutlined />} />
        </Input.Group>
    </Form>
);

export default InputSearch;
