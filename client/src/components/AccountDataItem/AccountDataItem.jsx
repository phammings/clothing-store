import React from "react";
import { Col, Row, Typography } from "antd";

const AccountDataItem = ({ title, text }) => {
  return (
    <Row style={{ marginBottom: 8 }}>
      <Col span={8}>
        <Typography.Text strong>{title}</Typography.Text>
      </Col>
      <Col span={12}>
        <Typography.Text>{text}</Typography.Text>
      </Col>
    </Row>
  );
};

export default AccountDataItem;
