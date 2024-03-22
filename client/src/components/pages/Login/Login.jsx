import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Divider, Form, Row, Space } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { selectErrorMessage } from "../../redux-toolkit/auth/auth-selector";
import { resetAuthState } from "../../redux-toolkit/auth/auth-slice";
import { activateAccount, login } from "../../redux-toolkit/auth/auth-thunks";
import { selectSuccessMessage } from "../../redux-toolkit/user/user-selector";
import { FORGOT } from "../../constants/routeConstants";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import FormInput from "../../components/FormInput/FormInput";
import IconButton from "../../components/IconButton/IconButton";
import "./Login.css";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const errorMessage = useSelector(selectErrorMessage);
    const successMessage = useSelector(selectSuccessMessage);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        if (params.code) {
            dispatch(activateAccount(params.code));
        }

        return () => {
            dispatch(resetAuthState());
        };
    }, []);

    const onClickSignIn = (userData) => {
        dispatch(login({ userData, history }));
    };

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
