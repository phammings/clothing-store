import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../security/request-service";
import {
    CLOTHES,
    CLOTHES_GRAPHQL_IDS,
    CLOTHES_GRAPHQL_CLOTHES,
    CLOTHES_IDS,
    CLOTH_SEARCH,
    CLOTH_SEARCH_TEXT
} from "../../constants/urlConstants";
import { geClothesByIdsQuery, getAllClothesByQuery } from "../../security/graphql-query/cloth-query";

export const fetchClothes = createAsyncThunk(
    "clothes/fetchClothes",
    async (page) => {
        const response = await RequestService.get(`${CLOTHES}?page=${page}`);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchClothesByIds = createAsyncThunk(
    "clothes/fetchClothesByIds",
    async (ids) => {
        const response = await RequestService.post(CLOTHES_IDS, ids);
        return response.data;
    }
);

export const fetchClothesByFilterParams = createAsyncThunk(
    "clothes/fetchClothesByFilterParams",
    async (filter) => {
        const response = await RequestService.post(`${CLOTH_SEARCH}?page=${filter.currentPage}`, filter);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchClothesByInputText = createAsyncThunk(
    "clothes/fetchClothesByInputText",
    async (data) => {
        const response = await RequestService.post(`${CLOTH_SEARCH_TEXT}?page=${data.currentPage}`, data);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

// GraphQL thunks
export const fetchClothesByQuery = createAsyncThunk(
    "clothes/fetchClothesByQuery",
    async () => {
        const response = await RequestService.post(CLOTHES_GRAPHQL_CLOTHES, { query: getAllClothesByQuery });
        return response.data.data.clothes;
    }
);

export const fetchClothesByIdsQuery = createAsyncThunk(
    "clothes/fetchClothesByIdsQuery",
    async (ids) => {
        const response = await RequestService.post(CLOTHES_GRAPHQL_IDS, { query: geClothesByIdsQuery(ids) });
        return response.data.data.clothesIds;
    }
);
