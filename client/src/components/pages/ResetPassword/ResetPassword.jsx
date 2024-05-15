import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LockOutlined, ReloadOutlined, SyncOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import { Alert, Col, Divider, Form, Row } from "antd";

import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import ContentTitle from "../../ContentTitle/ContentTitle";
import { selectErrorMessage, selectErrors, selectUserAuthEmail } from "../../../state-redux/auth/auth-selector";
import { resetAuthState } from "../../../state-redux/auth/auth-slice";
import { fetchResetPasswordCode, resetPassword } from "../../../state-redux/auth/auth-thunks";
import FormInput from "./../../FormInput/FormInput";
import IconButton from "./../../IconButton/IconButton";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const userEmail = useSelector(selectUserAuthEmail);
    const errorMessage = useSelector(selectErrorMessage);
    const resetPasswordErrors = useSelector(selectErrors);
    const { passwordError, password2Error } = resetPasswordErrors;

    useEffect(() => {
        dispatch(resetAuthState());

        if (params.code) {
            dispatch(fetchResetPasswordCode(params.code));
        }
    }, []);

    const onClickReset = (data) => {
        const userResetPasswordData = { email: userEmail, ...data };
        dispatch(resetPassword({ request: userResetPasswordData, history }));
    };

    return (
        <ContentWrapper>
            <ContentTitle icon={<SyncOutlined />} title={"RESET PASSWORD"} />
            <Row gutter={32}>
                <Col span={12}>
                    <Form onFinish={onClickReset}>
                        <Divider />
                        {errorMessage && <Alert type="error" message={errorMessage} />}
                        <FormInput
                            title={"Password:"}
                            icon={<LockOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            error={passwordError}
                            name={"password"}
                            placeholder={"Password"}
                            inputPassword
                        />
                        <FormInput
                            title={"Confirm password:"}
                            icon={<LockOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            error={password2Error}
                            name={"password2"}
                            placeholder={"Confirm password"}
                            inputPassword
                        />
                        <IconButton title={"Reset"} icon={<ReloadOutlined />} />
                    </Form>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default ResetPassword;
