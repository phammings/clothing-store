import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form } from "antd";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import {
    selectIsClothLoaded,
    selectIsClothLoading,
    selectCloth,
    selectClothError,
    selectClothErrorMessage,
    selectReviews
} from "../../../state-redux/cloth/cloth-selector";
import { selectIsReviewAdded, selectReviewErrors } from "../../../state-redux/user/user-selector";
import { fetchCloth, fetchReviewsByClothId } from "../../../state-redux/cloth/cloth-thunks";
import { resetInputForm } from "../../../state-redux/user/user-slice";
import { WEBSOCKET_URL } from "../../../constants/urlConstants";
import { resetClothState, setReview } from "../../../state-redux/cloth/cloth-slice";
import Spinner from "../../Spinner/Spinner";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ProductInfo from "./ProductInfo/ProductInfo";
import ProductReviews from "./ProductReviews/ProductReviews";
import { addReviewToCloth } from "../../../state-redux/user/user-thunks";
import { useCart } from "../../../hooks/useCart";
import "./Product.css";

let stompClient = null;

const Product = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const params = useParams();
    const cloth = useSelector(selectCloth);
    const reviews = useSelector(selectReviews);
    const isClothLoading = useSelector(selectIsClothLoading);
    const isClothLoaded = useSelector(selectIsClothLoaded);
    const isClothError = useSelector(selectClothError);
    const errorMessage = useSelector(selectClothErrorMessage);
    const reviewErrors = useSelector(selectReviewErrors);
    const isReviewAdded = useSelector(selectIsReviewAdded);
    const { addToCart } = useCart(cloth?.id);

    useEffect(() => {
        dispatch(fetchCloth(params.id));
        dispatch(resetInputForm());
        window.scrollTo(0, 0);
        stompClient = Stomp.over(() => new SockJS(WEBSOCKET_URL));
        stompClient.connect({}, () => {
            stompClient?.subscribe("/topic/reviews/" + params.id, (response) => {
                dispatch(setReview(JSON.parse(response.body)));
            });
        });

        return () => {
            stompClient?.disconnect();
            dispatch(resetClothState());
        };
    }, []);

    useEffect(() => {
        if (isClothLoaded) {
            dispatch(fetchReviewsByClothId(params.id));
        }
    }, [isClothLoaded]);

    useEffect(() => {
        form.resetFields();
    }, [isReviewAdded]);

    const addReview = (data) => {
        dispatch(addReviewToCloth({ clothId: params.id, ...data }));
    };

    return (
        <ContentWrapper>
            {isClothLoading ? (
                <Spinner />
            ) : (
                <>
                    {isClothError ? (
                        <ErrorMessage errorMessage={errorMessage} />
                    ) : (
                        <>
                            <ProductInfo cloth={cloth} reviewsLength={reviews.length} addToCart={addToCart} />
                            <ProductReviews
                                reviews={reviews}
                                reviewErrors={reviewErrors}
                                addReview={addReview}
                                form={form}
                            />
                        </>
                    )}
                </>
            )}
        </ContentWrapper>
    );
};

export default Product;
