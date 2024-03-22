import React from "react";
import { Col, Modal, Row, Typography } from "antd";

import "./DeleteModal.css";

const DeleteModal = ({ visible, deleteClothHandler, handleCancel, clothInfo }) => {
    return (
        <Modal title="Delete cloth" visible={visible} onOk={deleteClothHandler} onCancel={handleCancel}>
            <Row>
                <Col span={12} className={"delete-modal-cloth-image-wrapper"}>
                    <img
                        className={"delete-modal-cloth-image"}
                        alt={clothInfo?.title}
                        src={clothInfo?.filename}
                    />
                </Col>
                <Col span={12}>
                    <Typography.Text>Are you sure too delete?</Typography.Text>
                    <Typography.Title level={5}>{clothInfo?.clother}</Typography.Title>
                    <Typography.Title level={5}>{clothInfo?.title}</Typography.Title>
                </Col>
            </Row>
        </Modal>
    );
};

export default DeleteModal;
