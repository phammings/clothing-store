import React from "react";

import "./Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="footer">
            <div className="footer-social" style={{ textAlign: "center" }}>
                <a href="https://www.linkedin.com/in/ryan-pham-b102051a2/" target="_blank">
                    LinkedIn
                </a>
                <a href="https://github.com/phammings?tab=repositories" target="_blank">
                    Github
                </a>
                <a href="https://phammings.github.io/my-portfolio" target="_blank">
                    Portfolio
                </a>
            </div>
            <div style={{ color: "#ffffff", textAlign: "center", marginTop: "32px" }}>
                ©phammings {currentYear}
            </div>
        </div>
    );
};

export default Footer;
