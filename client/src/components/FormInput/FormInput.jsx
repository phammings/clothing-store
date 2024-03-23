import React from "react";
import { Col, Form, Input, Row, Typography } from "antd";

import "./FormInput.css";

const FormInput = ({
    title,
    icon,
    titleSpan,
    wrapperSpan,
    name,
    error,
    placeholder,
    disabled,
    rule,
    inputPassword
}) => (
    <Row className="form-item">
        <Col span={titleSpan}>
            <Typography.Text>{title}</Typography.Text>
            {icon}
        </Col>
        <Col span={wrapperSpan}>
            <Form.Item name={name} help={error} validateStatus={error ? "error" : ""} rules={rule}>
                {inputPassword ? (
                    <Input.Password disabled={disabled} placeholder={placeholder} />
                ) : (
                    <Input disabled={disabled} placeholder={placeholder} />
                )}
            </Form.Item>
        </Col>
    </Row>
);

export default FormInput;
