import React, { FC, ReactElement, useEffect, useState } from "react";
import { Alert, Col, Divider, Form, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { LockOutlined, MailOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";

import { selectErrors, selectIsAuthLoading, selectIsRegistered } from "../../../state-redux/auth/auth-selector";
import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import ContentTitle from "../../ContentTitle/ContentTitle";
import { registration } from "../../../state-redux/auth/auth-thunks";
import FormInput from "../../FormInput/FormInput";
import IconButton from "../../IconButton/IconButton";
import { resetAuthState, setAuthLoadingState } from "../../../state-redux/auth/auth-slice";
import { LoadingStatus, UserRegistration } from "../../../constants/types/types";

const Registration = () => {
    const dispatch = useDispatch();
    const isRegistered = useSelector(selectIsRegistered);
    const isLoading = useSelector(selectIsAuthLoading);
    const errors = useSelector(selectErrors);
    const [captchaValue, setCaptchaValue] = useState("");
    const [form] = Form.useForm();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(setAuthLoadingState(LoadingStatus.LOADED));

        return () => {
            dispatch(resetAuthState());
        };
    }, []);

    useEffect(() => {
        setCaptchaValue("");
    }, [isRegistered]);

    const onChangeRecaptcha = (token) => {
        setCaptchaValue(token);
    };

    const onClickSignIn = (userData) => {
        dispatch(registration({ ...userData, captcha: captchaValue }));
        // @ts-ignore
        window.grecaptcha.reset();
    };

    return (
        <ContentWrapper>
            <div style={{ textAlign:"center"}}>
                <ContentTitle title={"SIGN UP"} />
            </div>
            
            <Row justify="center" gutter={32}>
                <Col span={12}>
                    <Form form={form} onFinish={onClickSignIn}>
                        <Divider />
                        {isRegistered && <Alert type="success" message={"Success! Check your email to confirm registration."} />}
                        <FormInput
                            title={"E-mail:"}
                            icon={<MailOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"email"}
                            error={errors.emailError}
                            placeholder={"E-mail"}
                        />
                        <FormInput
                            title={"First name:"}
                            icon={<UserOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"firstName"}
                            error={errors.firstNameError}
                            placeholder={"First name"}
                        />
                        <FormInput
                            title={"Last name:"}
                            icon={<UserOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"lastName"}
                            error={errors.lastNameError}
                            placeholder={"Last name"}
                        />
                        <FormInput
                            title={"Password:"}
                            icon={<LockOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"password"}
                            error={errors.passwordError}
                            placeholder={"Password"}
                            inputPassword
                        />
                        <FormInput
                            title={"Confirm password:"}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"password2"}
                            error={errors.password2Error}
                            placeholder={"Confirm password"}
                            inputPassword
                        />
                        <div style={{ textAlign:"center"}}>
                            <IconButton disabled={isLoading} title={"Sign up"} icon={<UserAddOutlined />} />
                        </div>
                        <Row justify="center" align="middle" style={{ marginTop: "10%" }}>
                            <Col>
                                <Form.Item
                                    help={errors.captchaError}
                                    validateStatus={errors.captchaError ? "error" : "validating"}
                                >
                                    <ReCAPTCHA
                                        onChange={onChangeRecaptcha}
                                        sitekey="6Lc5cLkZAAAAAN8mFk85HQieB9toPcWFoW0RXCNR"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        
                    </Form>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default Registration;
