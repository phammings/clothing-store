import React from "react";
import { Col, Form, Input, Row, Typography } from "antd";

import "./FormInput.css";

const FormInput = ({
    title,
    titleSpan,
    wrapperSpan,
    name,
    error,
    placeholder,
    disabled,
    rule,
    inputPassword,
    maxLength // Add this prop
}) => (
    <Row className="form-item">
        <Col span={titleSpan}>
            <Typography.Text>{title}</Typography.Text>
        </Col>
        <Col span={wrapperSpan}>
            <Form.Item name={name} help={error} validateStatus={error ? "error" : ""} rules={rule}>
                {inputPassword ? (
                    <Input.Password disabled={disabled} placeholder={placeholder} maxLength={maxLength} /> // Apply maxLength to Input.Password
                ) : (
                    <Input disabled={disabled} placeholder={placeholder} maxLength={maxLength} /> // Apply maxLength to Input
                )}
            </Form.Item>
        </Col>
    </Row>
);

export default FormInput;
