import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, notification, Row, Upload, Select, Input } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import ContentTitle from "../../../ContentTitle/ContentTitle";
import IconButton from "../../../IconButton/IconButton";
import { selectAdminStateErrors, selectIsAdminStateLoading, selectIsClothEdited } from "../../../../state-redux/admin/admin-selector";
import { resetAdminState, setAdminLoadingState } from "../../../../state-redux/admin/admin-slice";
import { LoadingStatus } from "../../../../constants/types/types";
import { updateCloth } from "../../../../state-redux/admin/admin-thunks";
import { fetchCloth } from "../../../../state-redux/cloth/cloth-thunks";
import { useParams } from "react-router-dom";
import { selectCloth } from "../../../../state-redux/cloth/cloth-selector";
import { getAllClothesByQuery } from "../../../../security/graphql-query/cloth-query";
import { fetchClothes } from "../../../../state-redux/clothes/clothes-thunks";
const { Option } = Select;

const EditCloth = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const clothData = useSelector(selectCloth);
    const isLoading = useSelector(selectIsAdminStateLoading);
    const isClothEdited = useSelector(selectIsClothEdited);
    const [imageFile, setImageFile] = useState(null); // State to store the image file
    const [gender, setGender] = useState("");
    const [brand, setBrand] = useState("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));
        dispatch(fetchCloth(id));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, [dispatch, id]);

    useEffect(() => {
        if (isClothEdited) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Cloth edited",
                description: "Cloth successfully edited!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
          
        }
    }, [isClothEdited, dispatch]);

    useEffect(() => {
        if (clothData) {
            const { title, type, gender, color, size, middleNote, price, brand, country, topNote, baseNote
                , description } = clothData;
            form.setFieldsValue({
                title,
                type,
                gender,
                color,
                size,
                middleNote,
                price,
                brand,
                country,
                topNote,
                baseNote,
                description
            });
            setGender(gender);
            setBrand(brand);
        }
    }, [clothData, form]);

    const onFormSubmit = (data) => {
        // Extract the file from the form data
        const { file, ...formData } = data;

        const clothData = {
            ...formData,
            gender,
            clothRating: 0
        };

        // Create a FormData object to store the form data
        const bodyFormData = new FormData();
        if (imageFile) {
            bodyFormData.append("file", imageFile); // Append the image file to FormData
        }
        bodyFormData.append("cloth", new Blob([JSON.stringify(clothData)], { type: "application/json" }));
        
        dispatch(updateCloth({ clothId: id, data: bodyFormData }));
    };

    const handleUpload = ({ file }) => {
        setImageFile(file); // Update the image file state
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
        "Versace"
    ];
    
    return (
        <div>
            <ContentTitle title={"Edit cloth"} titleLevel={4} icon={<EditOutlined />} />
            <Form onFinish={onFormSubmit} form={form}>
                <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: "Please enter the cloth title" }]}
                        >
                            <Input
                                placeholder="Enter the cloth title"
                                disabled={isLoading}
                            />
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Type"
                            rules={[{ required: true, message: "Please select the cloth type" }]}
                        >
                            <Select
                                placeholder="Select the cloth type"
                                disabled={isLoading}
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
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                        </Form.Item>
                        {/* <Form.Item
                            name="middleNote"
                            label="Heart notes"
                            rules={[{ required: true, message: "Please enter the heart notes" }]}
                        >
                            <Input
                                placeholder="Enter the heart notes"
                                disabled={isLoading}
                            />
                        </Form.Item> */}
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: "Please enter the price" }]}
                        >
                            <Input
                                placeholder="Enter the price"
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                        </Form.Item>
                        {/* <Form.Item
                            name="topNote"
                            label="Top notes"
                            rules={[{ required: true, message: "Please enter the top notes" }]}
                        >
                            <Input
                                placeholder="Enter the top notes"
                                disabled={isLoading}
                            />
                        </Form.Item>
                        <Form.Item
                            name="baseNote"
                            label="Base notes"
                            rules={[{ required: true, message: "Please enter the base notes" }]}
                        >
                            <Input
                                placeholder="Enter the base notes"
                                disabled={isLoading}
                            />
                        </Form.Item> */}
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: "Please enter the description" }]}
                        >
                            <Input.TextArea
                                placeholder="Enter the description"
                                disabled={isLoading}
                            />
                        </Form.Item>
                        <Upload name="file" onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />} style={{ marginTop: 22 }}>
                                Click to Upload
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <IconButton title={"Edit"} icon={<EditOutlined />} disabled={isLoading} />
            </Form>
        </div>
    );
};

export default EditCloth;
