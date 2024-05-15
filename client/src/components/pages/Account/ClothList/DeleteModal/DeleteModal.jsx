// DeleteModal.jsx
import React from "react";
import { Button, Modal, Row, Col, Typography } from "antd";

const DeleteModal = ({ visible, deleteClothHandler, handleCancel, clothInfo }) => {
    const onDelete = () => {
        deleteClothHandler();
        handleCancel();
    };

    return (
        <Modal title="Delete cloth" visible={visible} onOk={onDelete} onCancel={handleCancel}>
            <Row>
                <Col span={12}>
                    <img
                        src={clothInfo && clothInfo.filename} // Check if clothInfo is not null before accessing its properties
                        alt={clothInfo && clothInfo.title}
                        style={{ width: "100%" }}
                    />
                </Col>
                <Col span={12}>
                    <Typography.Paragraph>Are you sure to delete?</Typography.Paragraph>
                    <Typography.Title level={5}>{clothInfo && clothInfo.clother}</Typography.Title>
                    <Typography.Title level={5}>{clothInfo && clothInfo.title}</Typography.Title>
                </Col>
            </Row>
        </Modal>
    );
};

export default DeleteModal;
