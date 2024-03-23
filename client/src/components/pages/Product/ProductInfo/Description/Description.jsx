import React from "react";
import { Divider, Row, Typography } from "antd";

const Description = ({ title }) => {
    return (
        <>
            <Row>
                <Typography.Text>{title}</Typography.Text>
            </Row>
            <Divider style={{ margin: "12px 0px" }} />
        </>
    );
};

export default Description;
