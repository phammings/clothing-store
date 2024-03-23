import React from "react";
import { Button } from "antd";

const IconButton = ({ title, icon, disabled }) => (
    <Button type="primary" htmlType="submit" icon={icon} disabled={disabled}>
        {title}
    </Button>
);

export default IconButton;
