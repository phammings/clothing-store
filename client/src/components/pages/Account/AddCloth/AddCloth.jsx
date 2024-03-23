import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, notification, Row, Upload } from "antd";
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
import AddFormInput from "./AddFormInput";
import AddFormSelect from "./AddFormSelect";
import IconButton from "../../../IconButton/IconButton";

const AddCloth = () => {
    const dispatch = useDispatch();
    const isClothAdded = useSelector(selectIsClothAdded);
    const ispClothLoading = useSelector(selectIsAdminStateLoading);
    const errors = useSelector(selectAdminStateErrors);
    const [file, setFile] = useState(null);
    const [gender, setGender] = useState(""); // Define gender state

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
            console.log(file)
            bodyFormData.append("file", file); // Append the file to FormData
        }
        
        // Construct cloth object
        const clothData = {
            ...data,
            gender,
            clothRating: 0
        };

        // Append cloth data as a blob
        bodyFormData.append("cloth", new Blob([JSON.stringify(clothData)], { type: "application/json" }));

        dispatch(addCloth(bodyFormData));
    };

    const handleUpload = (info) => {
        if (info.file) {
            console.log('file handler called')
            console.log(info)
            setFile(info.file); // Set file state
        }
    };
    const onGenderChange = (value) => {
        setGender(value); // Update gender state when gender is selected
    };

    return (
        <>
            <ContentTitle title={"Add cloth"} titleLevel={4} icon={<PlusSquareOutlined />} />
            <Form onFinish={onFormSubmit}>
                <Row gutter={32}>
                    <Col span={12}>
                        <AddFormInput
                            title={"Title"}
                            name={"title"}
                            error={errors.clothTitleError}
                            placeholder={"Enter the cloth title"}
                            disabled={ispClothLoading}
                        />
                        <AddFormInput
                            title={"Type"}
                            name={"type"}
                            error={errors.typeError}
                            placeholder={"Enter the cloth type"}
                            disabled={ispClothLoading}
                        />
                        <AddFormSelect
                            title={"Gender"}
                            name={"gender"}
                            error={errors.clothGenderError}
                            placeholder={"Select gender"}
                            disabled={ispClothLoading}
                            values={["male", "female"]}
                            onChange={onGenderChange} // Pass onGenderChange function to handle gender change
                        />
                        <AddFormInput
                            title={"Color"}
                            name={"color"}
                            error={errors.colorError}
                            placeholder={"Enter the cloth color"}
                            disabled={ispClothLoading}
                        />
                        <AddFormInput
                            title={"Size"}
                            name={"size"}
                            error={errors.sizeError}
                            placeholder={"Enter the cloth size"}
                            disabled={ispClothLoading}
                        />
                        <AddFormInput
                            title={"Heart notes"}
                            name={"middleNotes"}
                            error={errors.middleNotesError}
                            placeholder={"Enter the heart notes"}
                            disabled={ispClothLoading}
                        />
                        <AddFormInput
                            title={"Price"}
                            name={"price"}
                            error={errors.priceError}
                            placeholder={"Enter the price"}
                            disabled={ispClothLoading}
                        />
                    </Col>
                    <Col span={12}>
                        <AddFormInput
                            title={"Brand"}
                            name={"brand"}
                            error={errors.brandError}
                            placeholder={"Enter the brand"}
                            disabled={ispClothLoading}
                        />
                        <AddFormInput
                            title={"Manufacturer country"}
                            name={"country"}
                            error={errors.countryError}
                            placeholder={"Enter the manufacturer country"}
                            disabled={ispClothLoading}
                        />
                        <AddFormInput
                            title={"Top notes"}
                            name={"topNotes"}
                            error={errors.topNotesError}
                            placeholder={"Enter the top notes"}
                            disabled={ispClothLoading}
                        />
                        <AddFormInput
                            title={"Base notes"}
                            name={"baseNotes"}
                            error={errors.baseNotesError}
                            placeholder={"Enter the base notes"}
                            disabled={ispClothLoading}
                        />
                        <AddFormInput
                            title={"Description"}
                            name={"description"}
                            error={errors.descriptionError}
                            placeholder={"Enter the description"}
                            disabled={ispClothLoading}
                        />
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
