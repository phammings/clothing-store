import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, notification, Row, Upload, Select, Input } from "antd";
import { PlusSquareFilled, PlusSquareOutlined, UploadOutlined } from "@ant-design/icons";

import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsClothAdded
} from "../../../../state-redux/admin/admin-selector";
import { resetAdminState, setAdminLoadingState } from "../../../../state-redux/admin/admin-slice";
import { LoadingStatus } from "../../../../constants/types/types";
import { addCloth } from "../../../../state-redux/admin/admin-thunks";
import ContentTitle from "../../../ContentTitle/ContentTitle";
import IconButton from "../../../IconButton/IconButton";

const { Option } = Select;

const AddCloth = () => {
    const dispatch = useDispatch();
    const isClothAdded = useSelector(selectIsClothAdded);
    const ispClothLoading = useSelector(selectIsAdminStateLoading);
    const errors = useSelector(selectAdminStateErrors);
    const [file, setFile] = useState(null);
    const [gender, setGender] = useState("");
    const [brand, setBrand] = useState("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);

    useEffect(() => {
        if (isClothAdded) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Cloth added",
                description: "Cloth successfully added!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isClothAdded]);

    const onFormSubmit = (data) => {
        const bodyFormData = new FormData();

        if (file) {
            bodyFormData.append("file", file);
        }

        const clothData = {
            ...data,
            gender,
            brand,
            clothRating: 0
        };

        bodyFormData.append("cloth", new Blob([JSON.stringify(clothData)], { type: "application/json" }));
        console.log(clothData)
        dispatch(addCloth(bodyFormData));
    };
    
    const handleUpload = (info) => {
        if (info.file) {
            setFile(info.file);
            console.log(info.file)
        }
    };

    const onGenderChange = (value) => {
        setGender(value);
    };

    const onBrandChange = (value) => {
        setBrand(value);
    };

    const sampleBrands = [
    "Burberry",
    "Bvlgari",
    "Calvin Klein",
    "Carolina Herrera",
    "Chanel",
    "Creed",
    "Dior",
    "Dolce&Gabbana",
    "Giorgio Armani",
    "Gucci",
    "Hermes",
    "Hugo Boss",
    "Jean Paul Gaultier",
    "Lancome",
    "Paco Rabanne",
    "Prada",
    "Tom Ford",
    "Versace"];

    return (
        <>
            <ContentTitle title={"Add cloth"} titleLevel={4} icon={<PlusSquareOutlined />} />
            <Form onFinish={onFormSubmit}>
                <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: "Please enter the cloth title" }]}
                        >
                            <Input
                                placeholder="Enter the cloth title"
                                disabled={ispClothLoading}
                            />
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Type"
                            rules={[{ required: true, message: "Please select the cloth type" }]}
                        >
                            <Select
                                placeholder="Select the cloth type"
                                disabled={ispClothLoading}
                            >
                                <Select.Option value="shirt">Shirt</Select.Option>
                                <Select.Option value="pants">Pants</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true, message: "Please select a gender" }]}
                        >
                            <Select
                                placeholder="Select gender"
                                onChange={onGenderChange}
                                allowClear
                            >
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="color"
                            label="Color"
                            rules={[{ required: true, message: "Please enter the cloth color" }]}
                        >
                            <Input
                                placeholder="Enter the cloth color"
                                disabled={ispClothLoading}
                            />
                        </Form.Item>
                        <Form.Item
                            name="size"
                            label="Size (Only S, M, or L allowed)"
                            rules={[
                                { 
                                    required: true, 
                                    message: "Please enter the cloth size" 
                                },
                                {
                                    pattern: /^(S|M|L)$/i,
                                    message: "Only S, M, or L sizes are allowed"
                                }
                            ]}
                        >
                            <Input
                                placeholder="Enter the cloth size (S, M, or L)"
                                disabled={ispClothLoading}
                            />
                        </Form.Item>

                        {/* <Form.Item
                            name="middleNote"
                            label="Heart notes"
                            rules={[{ required: true, message: "Please enter the heart notes" }]}
                        >
                            <Input
                                placeholder="Enter the heart notes"
                                disabled={ispClothLoading}
                            />
                        </Form.Item> */}
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: "Please enter the price" }]}
                        >
                            <Input
                                placeholder="Enter the price"
                                disabled={ispClothLoading}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="brand"
                            label="Brand"
                            rules={[{ required: true, message: "Please select a brand" }]}
                        >
                            <Select
                                placeholder="Select a brand"
                                onChange={onBrandChange}
                                allowClear
                            >
                                {sampleBrands.map((brand) => (
                                    <Option key={brand} value={brand}>{brand}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="country"
                            label="Manufacturer country"
                            rules={[{ required: true, message: "Please enter the manufacturer country" }]}
                        >
                            <Input
                                placeholder="Enter the manufacturer country"
                                disabled={ispClothLoading}
                            />
                        </Form.Item>

                        {/* <Form.Item
                            name="baseNote"
                            label="Base notes"
                            rules={[{ required: true, message: "Please enter the base notes" }]}
                        >
                            <Input
                                placeholder="Enter the base notes"
                                disabled={ispClothLoading}
                            />
                        </Form.Item> */}
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: "Please enter the description" }]}
                        >
                            <Input.TextArea
                                placeholder="Enter the description"
                                disabled={ispClothLoading}
                            />
                        </Form.Item>
                        <Upload name="file" onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />} style={{ marginTop: 22 }}>
                                Click to Upload
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <IconButton title={"Add"} icon={<PlusSquareFilled />} />
            </Form>
        </>
    );
};

export default AddCloth;
