import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Divider, Form, Row, Typography } from "antd";
import { MailOutlined, SendOutlined } from "@ant-design/icons";

import {
    selectErrorMessage,
    selectIsAuthLoading,
    selectSuccessMessage
} from "../../../state-redux/auth/auth-selector";
import { setAuthLoadingState } from "../../../state-redux/auth/auth-slice";
import { LoadingStatus } from "../../../constants/types/types";
import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import ContentTitle from "../../ContentTitle/ContentTitle";
import FormInput from "../../FormInput/FormInput";
import IconButton from "../../IconButton/IconButton";
import { forgotPassword } from "../../../state-redux/auth/auth-thunks";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const error = useSelector(selectErrorMessage);
    const success = useSelector(selectSuccessMessage);
    const isLoading = useSelector(selectIsAuthLoading);

    useEffect(() => {
        dispatch(setAuthLoadingState(LoadingStatus.LOADED));
    }, []);

    useEffect(() => {
        form.resetFields();
    }, [success]);

    const onClickSend = (value) => {
        dispatch(forgotPassword(value.email));
    };

    return (
        <ContentWrapper>
            <div style={{ textAlign: "center" }}>
                <ContentTitle title={"FORGOT PASSWORD"} />
            </div>

            <Row justify="center" gutter={32}>
                <Col span={12}>
                    <Form form={form} onFinish={onClickSend}>
                        <Divider />
                        <Typography.Text style={{ display: "block", marginBottom: "24px", textAlign: "center" }}>
                            Enter the email address used to create the account.
                        </Typography.Text>
                        {error && <Alert type="error" message={error} />}
                        {success && <Alert type="success" message={success} />}
                        <FormInput
                            title={"E-mail:"}
                            icon={<MailOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"email"}
                            placeholder={"E-mail"}
                            rule={[{ required: true, message: "Please input your E-mail!" }]}
                        />
                        <div style={{ textAlign: "center", marginTop: "16px" }}>
                            <IconButton disabled={isLoading} title={"Send"} icon={<SendOutlined />} />
                        </div>
                    </Form>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default ForgotPassword;
