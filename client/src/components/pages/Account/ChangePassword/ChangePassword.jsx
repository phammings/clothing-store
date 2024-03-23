import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Form, Row } from "antd";
import { KeyOutlined, UndoOutlined } from "@ant-design/icons";

import { selectSuccessMessage, selectUserResetPasswordErrors } from "../../../../state-redux/user/user-selector";
import { resetInputForm } from "../../../../state-redux/user/user-slice";
import ContentTitle from "../../../ContentTitle/ContentTitle";
import FormInput from "../../../FormInput/FormInput";
import IconButton from "../../../IconButton/IconButton";
import { updateUserPassword } from "../../../../state-redux/user/user-thunks";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const errors = useSelector(selectUserResetPasswordErrors);
    const successMessage = useSelector(selectSuccessMessage);
    const { passwordError, password2Error } = errors;

    useEffect(() => {
        dispatch(resetInputForm());
    }, []);

    useEffect(() => {
        if (successMessage) {
            form.resetFields();
        }
    }, [successMessage]);

    const onFormSubmit = (data) => {
        dispatch(updateUserPassword({ ...data }));
    };

    return (
        <>
            <ContentTitle title={"Change Password"} titleLevel={4} icon={<KeyOutlined />} />
            <Form onFinish={onFormSubmit} form={form}>
                <Row>
                    <Col span={12}>
                        {successMessage && (
                            <Alert type="success" message={successMessage} style={{ marginBottom: 16 }} />
                        )}
                        <FormInput
                            title={"Enter a new password"}
                            titleSpan={10}
                            wrapperSpan={14}
                            name={"password"}
                            error={passwordError}
                            placeholder={"Password"}
                            inputPassword
                        />
                        <FormInput
                            title={"Confirm password"}
                            titleSpan={10}
                            wrapperSpan={14}
                            name={"password2"}
                            error={password2Error}
                            placeholder={"Password"}
                            inputPassword
                        />
                        <IconButton title={"Change"} icon={<UndoOutlined />} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default ChangePassword;
