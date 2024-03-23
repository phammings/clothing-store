import React from "react";
import { GithubOutlined, LinkedinOutlined, HomeFilled } from "@ant-design/icons";

import "./Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="footer-wrapper">
            <div className="footer-wrapper-social" style={{ textAlign: "center" }}>
                <a href="https://www.linkedin.com/in/ryan-pham-b102051a2/" target="_blank">
                    <LinkedinOutlined style={{ fontSize: "30px", color: "#ffffff"}} />
                </a>
                <a href="https://github.com/phammings?tab=repositories" target="_blank">
                    <GithubOutlined style={{ fontSize: "30px", color: "#ffffff"}} />
                </a>
                <a href="https://phammings.github.io/my-portfolio" target="_blank">
                    <HomeFilled style={{ fontSize: "30px", color: "#ffffff"}} />
                </a>
            </div>
            <div style={{ color: "#ffffff", textAlign: "center", marginTop: "32px" }}>
                ©phammings {currentYear}
            </div>
        </div>
    );
};

export default Footer;
