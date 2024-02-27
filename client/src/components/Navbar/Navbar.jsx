import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import './Navbar.css';

const NavBar = () => {
    return (
        <>
            <div className={"navbar-logo-wrapper"}>
                <Link to={"/"}>
                    <h1 className={"navbar-logo"} >
                        Clothes.
                    </h1>
                </Link>
            </div>
            <div className={"navbar-wrapper"} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <ul style={{ display: 'flex', listStyle: 'none', margin: '0 0 0 30px', padding: 0 }}>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={{ pathname: "/"}}>Clothes</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul style={{ display: 'flex', listStyle: 'none', margin: '0 30px 0 0', padding: 0 }}>
                        <li className={"navbar-cart"} style={{margin: '13px 0 0 30px'}}>
                            <Badge size="small" color={"red"}>
                                <Link to={"/"}>
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