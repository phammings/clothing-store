import React from "react";
import { Spin } from "antd";

const Spinner = () => {
    return <Spin size={"large"} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', height: '100%' }} />;
};

export default Spinner;
