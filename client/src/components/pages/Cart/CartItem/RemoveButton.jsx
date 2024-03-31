import React, { FC, memo, ReactElement } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";


const RemoveButton = memo(({ clothId, deleteFromCart }) => {

    return (
        <Button onClick={() => deleteFromCart(clothId)} icon={<CloseOutlined />}>
            Remove
        </Button>
    );
});

export default RemoveButton;
