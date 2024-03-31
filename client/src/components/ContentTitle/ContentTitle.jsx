import React from "react";
import { Space, Typography } from "antd";

import "./ContentTitle.css";

const ContentTitle = ({ icon, title, titleLevel }) => {
  return (
    <Space align="center" className="title-icon">
      {icon}
      <Typography.Title level={titleLevel}>{title}</Typography.Title>
    </Space>
  );
};

export default ContentTitle;
