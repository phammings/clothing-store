import React from "react";
import { Spin } from "antd";

import "./Spinner.css";

const Spinner = () => {
    return <Spin size={"large"} className={"spinner"} />;
};

export default Spinner;
