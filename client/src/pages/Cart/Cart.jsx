import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

import ContentTitle from "../../components/ContentTitle/ContentTitle";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";

import CartItem from "./CartItem/CartItem";
import Spinner from "../../components/Spinner/Spinner";
import CartTotalPrice from "./CartTotalPrice";
import { ORDER } from "../../constants/routeConstants";
import "./Cart.css";

const Cart = () => {
   

    return (
        <ContentWrapper>
            {isCartLoading ? (
                <Spinner />
            ) : (
                <>
                    <div style={{ textAlign: "center" }}>
                        <ContentTitle icon={<ShoppingCartOutlined />} title={"Cart"} />
                    </div>
                    <Row gutter={32}>
                        {clothes.length === 0 ? (
                            <Col span={24}>
                                <Typography.Title level={3} style={{ textAlign: "center" }}>
                                    Cart is empty
                                </Typography.Title>
                            </Col>
                        ) : (
                            <>
                                <Col span={16}>
                                    {clothes.map((cloth) => (
                                        <CartItem
                                            key={cloth.id}
                                            cloth={cloth}
                                            clothInCart={clothInCart.get(cloth.id)}
                                            onChangeClothItemCount={onChangeClothItemCount}
                                            deleteFromCart={deleteFromCart}
                                        />
                                    ))}
                                </Col>
                                <Col span={8}>
                                    <Row gutter={16} style={{ marginTop: 16 }}>
                                        <Col>
                                            <CartTotalPrice />
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col>
                                            <Link to={ORDER}>
                                                <Button type="primary" size="large">
                                                    Checkout
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </>
                        )}
                    </Row>
                </>
            )}
        </ContentWrapper>
    );
};

export default Cart;
