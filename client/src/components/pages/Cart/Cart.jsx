import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

import ContentTitle from "../../ContentTitle/ContentTitle";
import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import { selectCartItems, selectIsCartLoading } from "../../../state-redux/cart/cart-selector";
import { fetchCart } from "../../../state-redux/cart/cart-thunks";
import {
    calculateCartPrice,
    removeClothById,
    resetCartState,
    setCartItemsCount
} from "../../../state-redux/cart/cart-slice";
import CartItem from "./CartItem/CartItem";
import Spinner from "../../Spinner/Spinner";
import CartTotalPrice from "./CartTotalPrice";
import { ORDER } from "../../../constants/routeConstants";
import "./Cart.css";

const Cart = () => {
    const dispatch = useDispatch();
    const clothes = useSelector(selectCartItems);
    const isCartLoading = useSelector(selectIsCartLoading);
    const [clothInCart, setClothInCart] = useState(() => new Map());

    useEffect(() => {
        window.scrollTo(0, 0);
        const clothesFromLocalStorage = new Map(
            JSON.parse(localStorage.getItem("clothes"))
        );

        dispatch(fetchCart(Array.from(clothesFromLocalStorage.keys())));
        clothesFromLocalStorage.forEach((value, key) => {
            setClothInCart(clothInCart.set(key, value));
        });

        return () => {
            dispatch(resetCartState());
        };
    }, []);

    const deleteFromCart = (clothId) => {
        clothInCart.delete(clothId);

        if (clothInCart.size === 0) {
            localStorage.removeItem("clothes");
            setClothInCart(new Map());
        } else {
            localStorage.setItem("clothes", JSON.stringify(Array.from(clothInCart.entries())));
        }
        dispatch(removeClothById(clothId));
        dispatch(setCartItemsCount(clothInCart.size));
    };

    const onChangeClothItemCount = (clothId, inputValue) => {
        setClothes(clothId, inputValue);
        dispatch(calculateCartPrice(clothes));
    };

    const setClothes = (clothId, clothCount) => {
        setClothInCart(clothInCart.set(clothId, clothCount));
        localStorage.setItem("clothes", JSON.stringify(Array.from(clothInCart.entries())));
    };


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
