import React from "react";
import { Alert, Col, Divider, Form, Row } from "antd";

import ReCAPTCHA from "react-google-recaptcha";
import { LockOutlined, MailOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";

import FormInput from "../../components/FormInput/FormInput";
import IconButton from "../../components/IconButton/IconButton";


const Registration = () => {
 
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
