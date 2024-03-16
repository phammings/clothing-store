import React from "react";
import { Link } from "react-router-dom";

import { Alert, Col, Divider, Form, Row, Space } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { FORGOT } from "../../constants/routeConstants";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import FormInput from "../../components/FormInput/FormInput";
import IconButton from "../../components/IconButton/IconButton";
import "./Login.css";

const Login = () => {

    return (
        <ContentWrapper>
            <div style={{ textAlign:"center"}}>
                <ContentTitle title={"SIGN IN"} />
            </div>
            <Row justify="center" gutter={32}>
                <Col span={12}>
                    <Form onFinish={onClickSignIn}>
                        <Divider />
                        {errorMessage && <Alert type="error" message={errorMessage} />}
                        {successMessage && <Alert type="success" message={successMessage} />}
                        <FormInput
                            title={"E-mail:"}
                            icon={<MailOutlined />}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"email"}
                            placeholder={"E-mail"}
                        />
                        <FormInput
                            title={"Password:"}
                            icon={<LockOutlined />}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"password"}
                            placeholder={"Password"}
                            inputPassword
                        />
                        <Row justify="center" align="middle">
                            <Space align={"baseline"} size={13}>
                                <IconButton title={"Sign in"} icon={null} />
                                <Link to={FORGOT}>Forgot password?</Link>
                            </Space>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default Login;
