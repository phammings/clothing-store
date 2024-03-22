import React from "react";
import { Radio, Row, Typography } from "antd";


const MenuRadioSection = ({ title, onChange, data })=> {
    return (
        <div>
            <Typography.Title level={5} style={{ marginTop: 8 }}>
                {title}
            </Typography.Title>
            <Radio.Group onChange={onChange}>
                {data.map((value, index) => (
                    <Row key={index}>
                        <Radio value={value.array}>{value.name}</Radio>
                    </Row>
                ))}
            </Radio.Group>
        </div>
    );
};

export default MenuRadioSection;
