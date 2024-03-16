import React from "react";
import { Alert, Col, Divider, Form, Row, Typography } from "antd";
import { MailOutlined, SendOutlined } from "@ant-design/icons";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import FormInput from "../../components/FormInput/FormInput";
import IconButton from "../../components/IconButton/IconButton";

const ForgotPassword = () => {

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
