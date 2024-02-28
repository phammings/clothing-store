import React from "react";

import "./ContentWrapper.css";

const ContentWrapper = ({ children }) => {
    return (
        <div>
            <div className={"login-content"}>{children}</div>
        </div>
    );
};

export default ContentWrapper;
