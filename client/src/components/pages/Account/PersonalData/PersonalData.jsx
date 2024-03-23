import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "antd";
import { CheckOutlined, EditOutlined, EyeInvisibleOutlined, ProfileOutlined } from "@ant-design/icons";

import { selectUserEditErrors, selectUserFromUserState } from "../../../../state-redux/user/user-selector";
import ContentTitle from "../../../ContentTitle/ContentTitle";
import AccountDataItem from "../../../AccountDataItem/AccountDataItem";
import FormInput from "../../../FormInput/FormInput";
import IconButton from "../../../IconButton/IconButton";
import { updateUserInfo } from "../../../../state-redux/user/user-thunks";
import { resetInputForm } from "../../../../state-redux/user/user-slice";

const PersonalData = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const usersData = useSelector(selectUserFromUserState);
    const errors = useSelector(selectUserEditErrors);
    const [showUserData, setShowUserData] = useState(false);
    const { firstNameError, lastNameError } = errors;

    const onClickShowUserData = () => {
        setShowUserData((prevState) => !prevState);
    };

    useEffect(() => {
        dispatch(resetInputForm());

        if (usersData) {
            form.setFieldsValue(usersData);
        }
    }, []);

    const onFormSubmit = (data) => {
        dispatch(updateUserInfo({ id: usersData?.id, ...data }));
    };

    return (
        <>
            <ContentTitle title={"My Account"} titleLevel={4} icon={<ProfileOutlined />} />
            <Row>
                <Col span={12}>
                    <AccountDataItem title={"Email"} text={usersData?.email} />
                    <AccountDataItem title={"First name"} text={usersData?.firstName} />
                    <AccountDataItem title={"Last name"} text={usersData?.lastName} />
                    <AccountDataItem title={"City"} text={usersData?.city} />
                    <AccountDataItem title={"Address"} text={usersData?.address} />
                    <AccountDataItem title={"Phone number"} text={usersData?.phoneNumber} />
                    <AccountDataItem title={"Credit card"} text={usersData?.creditCard} />
                    <Button
                        type={"primary"}
                        onClick={onClickShowUserData}
                        icon={showUserData ? <EyeInvisibleOutlined /> : <EditOutlined />}
                    >
                        {showUserData ? "Hide" : "Edit"}
                    </Button>
                </Col>
                <Col span={12}>
                    {showUserData && (
                        <Form onFinish={onFormSubmit} form={form}>
                            <FormInput
                                title={"First name:"}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"firstName"}
                                error={firstNameError}
                                placeholder={"First name"}
                            />
                            <FormInput
                                title={"Last name:"}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"lastName"}
                                error={lastNameError}
                                placeholder={"Last name"}
                            />
                            <FormInput
                                title={"City:"}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"city"}
                                placeholder={"City"}
                            />
                            <FormInput
                                title={"Address:"}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"address"}
                                placeholder={"Address"}
                            />
                            <FormInput
                                title={"Phone number:"}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"phoneNumber"}
                                placeholder={"Phone number"}
                            />
                            <FormInput
                                title={"Credit card:"}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"creditCard"}
                                placeholder={"Credit card"}
                            />
                            <IconButton title={"Save"} icon={<CheckOutlined />} />
                        </Form>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default PersonalData;
