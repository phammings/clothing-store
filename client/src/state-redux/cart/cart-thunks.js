import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../security/request-service";
import { USERS_CART } from "../../constants/urlConstants";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (clothIds) => {
    const response = await RequestService.post(USERS_CART, clothIds);
    return response.data;
});
