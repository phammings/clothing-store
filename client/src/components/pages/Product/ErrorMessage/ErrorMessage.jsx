import React from "react";
import { Col, Row, Typography } from "antd";

const ErrorMessage = ({ errorMessage }) => {
    return (
        <Row>
            <Col span={24} style={{ textAlign: "center" }}>
                <Typography.Title level={3}>{errorMessage}</Typography.Title>
            </Col>
        </Row>
    );
};

export default ErrorMessage;
