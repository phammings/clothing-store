import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, notification, Row, Upload } from "antd";

import ContentTitle from "../../../ContentTitle/ContentTitle";
import FormInput from "../../../FormInput/FormInput";
import { selectCloth } from "../../../../state-redux/cloth/cloth-selector";
import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsClothEdited
} from "../../../../state-redux/admin/admin-selector";
import { LoadingStatus } from "../../../../constants/types/types";
import { resetAdminState, setAdminLoadingState } from "../../../../state-redux/admin/admin-slice";
import { fetchCloth } from "../../../../state-redux/cloth/cloth-thunks";
import IconButton from "../../../IconButton/IconButton";
import EditClothSelect from "./EditClothSelect";
import { updateCloth } from "../../../../state-redux/admin/admin-thunks";
import "./EditCloth.css";

const EditCloth = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const params = useParams();
    const clothData = useSelector(selectCloth);
    const isLoading = useSelector(selectIsAdminStateLoading);
    const errors = useSelector(selectAdminStateErrors);
    const isClothEdited = useSelector(selectIsClothEdited);
    const [file, setFile] = useState("");
    const [gender, setGender] = useState(""); // Define gender state

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));
        dispatch(fetchCloth(params.id));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);
    
    useEffect(() => {
        if (clothData) {
            form.setFieldsValue(clothData);
        }
    }, [clothData])

    useEffect(() => {
        if (isClothEdited) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Cloth edited",
                description: "Cloth successfully edited!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isClothEdited]);

    const onFormSubmit = (data) => {
        const { file, ...formData } = data;

        const bodyFormData = new FormData();
        if (file) {
            bodyFormData.append("file", file);
        }
        
        // Construct cloth object
        const clothData = {
            ...formData,
            gender,
            clothRating: 0
        };

        // Append cloth data as a blob
        bodyFormData.append("cloth", new Blob([JSON.stringify(clothData)], { type: "application/json" }));

        dispatch(updateCloth(bodyFormData));
    };

    const handleUpload = ({ file }) => {
        setFile(file);
    };

    const onGenderChange = (value) => {
        setGender(value); // Update gender state when gender is selected
    };

    return (
        <div>
            <ContentTitle title={"Edit cloth"} titleLevel={4} icon={<EditOutlined />} />
            <Form onFinish={onFormSubmit} form={form}>
            <Row gutter={32}>
                    <Col span={12}>
                        <FormInput
                            title={"Title"}
                            name={"title"}
                            error={errors.clothTitleError}
                            placeholder={"Enter the cloth title"}
                            disabled={isLoading}
                        />
                        <FormInput
                            title={"Type"}
                            name={"type"}
                            error={errors.typeError}
                            placeholder={"Enter the cloth type"}
                            disabled={isLoading}
                        />
                        <EditClothSelect
                            title={"Gender"}
                            name={"gender"}
                            error={errors.clothGenderError}
                            placeholder={"Select gender"}
                            disabled={isLoading}
                            values={["male", "female"]}
                            onChange={onGenderChange} // Pass onGenderChange function to handle gender change
                        />
                        <FormInput
                            title={"Color"}
                            name={"color"}
                            error={errors.colorError}
                            placeholder={"Enter the cloth color"}
                            disabled={isLoading}
                        />
                        <FormInput
                            title={"Size"}
                            name={"size"}
                            error={errors.sizeError}
                            placeholder={"Enter the cloth size"}
                            disabled={isLoading}
                        />
                        <FormInput
                            title={"Heart notes"}
                            name={"middleNotes"}
                            error={errors.middleNotesError}
                            placeholder={"Enter the heart notes"}
                            disabled={isLoading}
                        />
                        <FormInput
                            title={"Price"}
                            name={"price"}
                            error={errors.priceError}
                            placeholder={"Enter the price"}
                            disabled={isLoading}
                        />
                    </Col>
                    <Col span={12}>
                        <FormInput
                            title={"Brand"}
                            name={"brand"}
                            error={errors.brandError}
                            placeholder={"Enter the brand"}
                            disabled={isLoading}
                        />
                        <FormInput
                            title={"Manufacturer country"}
                            name={"country"}
                            error={errors.countryError}
                            placeholder={"Enter the manufacturer country"}
                            disabled={isLoading}
                        />
                        <FormInput
                            title={"Top notes"}
                            name={"topNotes"}
                            error={errors.topNotesError}
                            placeholder={"Enter the top notes"}
                            disabled={isLoading}
                        />
                        <FormInput
                            title={"Base notes"}
                            name={"baseNotes"}
                            error={errors.baseNotesError}
                            placeholder={"Enter the base notes"}
                            disabled={isLoading}
                        />
                        <FormInput
                            title={"Description"}
                            name={"description"}
                            error={errors.descriptionError}
                            placeholder={"Enter the description"}
                            disabled={isLoading}
                        />
                        <Upload name={"file"} onChange={handleUpload} beforeUpload={() => false}>
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
