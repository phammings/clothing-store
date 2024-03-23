import React from "react";
import { Form, Select, Typography } from "antd";

const AddFormSelect = ({ title, name, error, placeholder, disabled, values, onChange }) => {
    return (
        <Form.Item name={name} help={error} validateStatus={error && "error"}>
            <Typography.Text>{title}</Typography.Text>
            <Select
                placeholder={placeholder}
                disabled={disabled}
                style={{ width: "100%" }}
                onChange={onChange} // Add onChange event handler
            >
                {values.map((option, index) => (
                    <Select.Option key={index} value={option}>
                        {option}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    );
};

export default AddFormSelect;