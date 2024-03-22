import React from "react";
import { NavLink } from "react-router-dom";

import "./AccountLink.css";

const AccountLink = ({ link, title }) => {
    return (
        <NavLink
            to={link}
            className="account-sidebar-link nav-link"
            activeClassName="is-active"
            style={{ display: "block", marginBottom: 8 }}
        >
            {title}
        </NavLink>
    );
};

export default AccountLink;
