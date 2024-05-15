import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CheckCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Typography, Alert } from "antd";

import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import ContentTitle from "../../ContentTitle/ContentTitle";
import FormInput from "../../FormInput/FormInput";
import { selectUserFromUserState } from "../../../state-redux/user/user-selector";
import { selectCartItems, selectTotalPrice } from "../../../state-redux/cart/cart-selector";
import { selectIsOrderLoading, selectOrderErrors } from "../../../state-redux/order/order-selector";
import { resetOrderState, setOrderLoadingState } from "../../../state-redux/order/order-slice";
import { LoadingStatus } from "../../../constants/types/types";
import { addOrder } from "../../../state-redux/order/order-thunks";
import { resetCartState } from "../../../state-redux/cart/cart-slice";
import { fetchCart } from "../../../state-redux/cart/cart-thunks";
import OrderItem from "./OrderItem/OrderItem";

const Order = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm();
    const usersData = useSelector(selectUserFromUserState);
    const clothes = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const errors = useSelector(selectOrderErrors);
    const isOrderLoading = useSelector(selectIsOrderLoading);
    const [clothesFromLocalStorage, setClothesFromLocalStorage] = useState(new Map());

    useEffect(() => {
        const clothesFromLocalStorage = new Map(JSON.parse(localStorage.getItem("clothes")));
        setClothesFromLocalStorage(clothesFromLocalStorage);
        dispatch(setOrderLoadingState(LoadingStatus.LOADED));
        dispatch(fetchCart(Array.from(clothesFromLocalStorage.keys())));

        if (usersData) {
            form.setFieldsValue(usersData);
        }

        return () => {
            dispatch(resetOrderState());
            dispatch(resetCartState());
        };
    }, []);

    const onFormSubmit = (order) => {
        const clothesId = Object.fromEntries(new Map(JSON.parse(localStorage.getItem("clothes"))));
        console.log(order)
        dispatch(addOrder({ order: { ...order, clothesId, totalPrice }, history }));
    };
    const [creditCard, setCreditCard] = useState('');

    const handleCreditCardChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 16) {
            setCreditCard(inputValue);
        }
    };
    return (
        <ContentWrapper>
            <div style={{ textAlign: "center" }}>
                <ContentTitle icon={<ShoppingOutlined />} title={"Ordering"} />
            </div>
            <Form onFinish={onFormSubmit} form={form}>
                <Row gutter={32}>
                    <Col span={12}>
                        <FormInput
                            title={"Name:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"firstName"}
                            error={errors.firstNameError}
                            disabled={isOrderLoading}
                            placeholder={"Enter the first name"}
                        />
                        <FormInput
                            title={"Surname:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"lastName"}
                            error={errors.lastNameError}
                            disabled={isOrderLoading}
                            placeholder={"Enter the last name"}
                        />
                        <FormInput
                            title={"City:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"city"}
                            error={errors.cityError}
                            disabled={isOrderLoading}
                            placeholder={"Enter the city"}
                        />
                        <FormInput
                            title={"Address:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"address"}
                            error={errors.addressError}
                            disabled={isOrderLoading}
                            placeholder={"Enter the address"}
                        />
                        <FormInput
                            title={"Mobile:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"phoneNumber"}
                            error={errors.phoneNumberError}
                            disabled={isOrderLoading}
                            placeholder={"(___)-___-____"}
                        />

                        <FormInput
                            title={"Email:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"email"}
                            error={errors.emailError}
                            disabled={isOrderLoading}
                            placeholder={"example@gmail.com"}
                        />          <Row style={{ marginTop: "20px" }} />
                        <FormInput
                            title={"Credit Card:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"creditCard"}
                            error={errors.postIndexError}
                            disabled={isOrderLoading}
                            placeholder={"Enter credit card number"}
                            maxLength={16}
                        />
                        {/* <Row style={{ marginTop: "10px" }} />
                        <div style={{display:"flex",justifyContent:'space-between'}}>
                            <label>Credit Card</label>                       
                            <input style={{
    width: "79%",
    borderColor: "#eaeae1",
    borderRadius: "1px",
    boxShadow: "none", // Remove the default box shadow
    ":focus": { borderColor: "lightblue" }, 
    outlineColor: "lightblue",
    padding: "3px 0 3px 10px"
}}

            title={"Credit Card:"}
            titleSpan={5}
            wrapperSpan={19}
            name={"creditCard"}
            value={creditCard}
            onChange={handleCreditCardChange}
            error={errors.postIndexError}
            disabled={isOrderLoading}
            placeholder={"Enter credit card number"}
            maxLength={16}
        />
 </div> */}
                    </Col>
                    <Col span={12}>
                        <Row gutter={[32, 32]}>
                            {clothes.map((cloth) => (
                                <OrderItem
                                    key={cloth.id}
                                    cloth={cloth}
                                    quantity={clothesFromLocalStorage.get(cloth.id)}
                                />
                            ))}
                        </Row>
                        <Row gutter={[32, 32]} style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <Row gutter={16} style={{ marginTop: 16 }}>
                                    <Col>
                                        <Typography.Title level={3}>To pay : $ {totalPrice}.00</Typography.Title>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col>
                                        <Button
                                            htmlType={"submit"}
                                            loading={isOrderLoading}
                                            type="primary"
                                            size="large"
                                            icon={<CheckCircleOutlined />}
                                        >
                                            Validate order
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </ContentWrapper>
    );
};

export default Order;
