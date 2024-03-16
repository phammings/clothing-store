import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Badge, Space } from "antd";

import { selectUserFromUserState } from "../../redux-toolkit/user/user-selector";
import { selectCartItemsCount } from "../../redux-toolkit/cart/cart-selector";
import { logoutSuccess } from "../../redux-toolkit/user/user-slice";
import { ACCOUNT, BASE, LOGIN, MENU, REGISTRATION } from "../../constants/routeConstants";
import { CART } from "../../constants/urlConstants";
import "./NavBar.css";

const NavBar = () => {
    const dispatch = useDispatch();
    const usersData = useSelector(selectUserFromUserState);
    const cartItemsCount = useSelector(selectCartItemsCount);

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logoutSuccess());
    };

    const renderAuthLinks = () => {
        if (usersData) {
            return (
                <>
                    <li>
                        <Link to={ACCOUNT}>
                            <Space align="baseline">
                                My Account
                            </Space>
                        </Link>
                    </li>
                    <li>
                        <Link id={"handleLogout"} to={BASE} onClick={handleLogout}>
                            <Space align="baseline">
                                Exit
                            </Space>
                        </Link>
                    </li>
                </>
            );
        } else {
            return (
                <>
                    <li>
                        <Link to={LOGIN}>
                            <Space align="baseline">
                                Sign In
                            </Space>
                        </Link>
                    </li>
                    <li>
                        <Link to={REGISTRATION}>
                            <Space align="baseline">
                                Sign Up
                            </Space>
                        </Link>
                    </li>
                </>
            );
        }
    };

    return (
        <>
            <div className={"navbar-logo-wrapper"}>
                <Link to={BASE}>
                    <h1 className={"navbar-logo"} >
                        Clothes.
                    </h1>
                </Link>
            </div>
            <div className={"navbar-wrapper"} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <ul style={{ display: 'flex', listStyle: 'none', margin: '0 0 0 30px', padding: 0 }}>
                        <li>
                            <Link to={BASE}>Home</Link>
                        </li>
                        <li>
                            <Link to={{ pathname: MENU, state: { id: "all" } }}>Clothes</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul style={{ display: 'flex', listStyle: 'none', margin: '0 30px 0 0', padding: 0 }}>
                        {renderAuthLinks()}
                        <li className={"navbar-cart"} style={{margin: '13px 0 0 30px'}}>
                            <Badge count={cartItemsCount} size="small" color={"red"}>
                                <Link to={CART}>
                                    <ShoppingCartOutlined />
                                </Link>
                            </Badge>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavBar;
