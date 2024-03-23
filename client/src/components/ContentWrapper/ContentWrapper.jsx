import React from "react";
import { Layout } from "antd";

import "./ContentWrapper.css";

const ContentWrapper = ({ children }) => {
    return (
        <Layout>
            <Layout.Content className={"login-content"}>{children}</Layout.Content>
        </Layout>
    );
};

export default ContentWrapper;
