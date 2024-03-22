import React from "react";
import { Checkbox, Row, Typography } from "antd";

const MenuCheckboxSection = ({ title, onChange, category, data, selectedValues }) => {
    return (
        <div>
            <Typography.Title level={5} style={{ marginTop: 8 }}>
                {title}
            </Typography.Title>
            <Checkbox.Group
                value={selectedValues}
                onChange={(checkedValues) => onChange(checkedValues, category)}
                style={{
                    overflow: "auto",
                    maxHeight: "250px",
                    width: "100%"
                }}
            >
                {data.map((value, index) => (
                    <Row key={index}>
                        <Checkbox value={value.name}>{value.name}</Checkbox>
                    </Row>
                ))}
            </Checkbox.Group>
        </div>
    );
};

export default MenuCheckboxSection;
