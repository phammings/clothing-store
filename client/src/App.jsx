import React, { FC, ReactElement, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { BackTop } from "antd";

import {
    ACCOUNT,
    ACTIVATE,
    BASE,
    CART,
    FORGOT,
    LOGIN,
    MENU,
    OAUTH2_REDIRECT,
    ORDER,
    ORDER_FINALIZE,
    PRODUCT,
    REGISTRATION,
    RESET
} from "./constants/routeConstants";
import { fetchCart } from "./state-redux/cart/cart-thunks";
import { fetchUserInfo } from "./state-redux/user/user-thunks";
import Login from "./components/pages/Login/Login";
import Registration from "./components/pages/Registration/Registration";
import ForgotPassword from "./components/pages/ForgotPassword/ForgotPassword";
import Menu from "./components/pages/Menu/Menu";
import Cart from "./components/pages/Cart/Cart";
import Order from "./components/pages/Order/Order";
import Home from "./components/pages/Home/Home";
import Product from "./components/pages/Product/Product";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";
import Account from "./components/pages/Account/Account";
import OrderFinalize from "./components/pages/OrderFinalize/OrderFinalize";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import OAuth2RedirectHandler from "./security/oauth2/OAuth2RedirectHandler";
import "./App.css";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const clothesFromLocalStorage = new Map(
            JSON.parse(localStorage.getItem("clothes"))
        );
        dispatch(fetchCart(Array.from(clothesFromLocalStorage.keys())));

        if (localStorage.getItem("token")) {
            dispatch(fetchUserInfo());
        }
    }, []);

    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path={BASE} component={Home} />
                <Route exact path={LOGIN} component={Login} />
                <Route exact path={REGISTRATION} component={Registration} />
                <Route exact path={FORGOT} component={ForgotPassword} />
                <Route exact path={`${RESET}/:code`} component={ResetPassword} />
                <Route exact path={`${ACTIVATE}/:code`} component={Login} />
                <Route exact path={MENU} component={Menu} />
                <Route exact path={`${PRODUCT}/:id`} component={Product} />
                <Route exact path={CART} component={Cart} />
                <Route exact path={ORDER} component={Order} />
                <Route exact path={ORDER_FINALIZE} component={OrderFinalize} />
                <Route path={OAUTH2_REDIRECT} component={OAuth2RedirectHandler} />
                <Route
                    path={ACCOUNT}
                    render={() =>
                        localStorage.getItem("token") ? <Route component={Account} /> : <Route component={Home} />
                    }
                />
                <Route path="*" component={Home} />
            </Switch>
            <Footer />
            <BackTop />
        </>
    );
};

export default App;
