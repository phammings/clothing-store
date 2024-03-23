import React from "react";
import { Form, Input, Typography } from "antd";

const AddFormInput = ({ title, name, error, placeholder, disabled }) => {
    return (
        <div>
            <Typography.Text>{title}</Typography.Text>
            <Form.Item name={name} help={error} validateStatus={error && "error"}>
                <Input disabled={disabled} placeholder={placeholder} />
            </Form.Item>
        </div>
    );
};

export default AddFormInput;
