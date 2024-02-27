import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../utils/request-service";
import {
    Clothes,
    Clothes_GRAPHQL_IDS,
    Clothes_GRAPHQL_Clothes,
    Clothes_IDS,
    Clothes_SEARCH,
    Clothes_SEARCH_TEXT
} from "../../constants/urlConstants";
import { geClothesByIdsQuery, getAllClothesByQuery } from "../../utils/graphql-query/clothes-query";

export const fetchClothes = createAsyncThunk(
    "Clothes/fetchClothes",
    async (page) => {
        const response = await RequestService.get(`${Clothes}?page=${page}`);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchClothesByIds = createAsyncThunk(
    "Clothes/fetchClothesByIds",
    async (ids) => {
        const response = await RequestService.post(Clothes_IDS, ids);
        return response.data;
    }
);

export const fetchClothesByFilterParams = createAsyncThunk(
    "Clothes/fetchClothesByFilterParams",
    async (filter) => {
        const response = await RequestService.post(`${Clothes_SEARCH}?page=${filter.currentPage}`, filter);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchClothesByInputText = createAsyncThunk(
    "Clothes/fetchClothesByInputText",
    async (data) => {
        const response = await RequestService.post(`${Clothes_SEARCH_TEXT}?page=${data.currentPage}`, data);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

// GraphQL thunks
export const fetchClothesByQuery = createAsyncThunk(
    "Clothes/fetchClothesByQuery",
    async () => {
        const response = await RequestService.post(Clothes_GRAPHQL_Clothes, { query: getAllClothesByQuery });
        return response.data.data.Clothes;
    }
);

export const fetchClothesByIdsQuery = createAsyncThunk(
    "Clothes/fetchClothesByIdsQuery",
    async (ids) => {
        const response = await RequestService.post(Clothes_GRAPHQL_IDS, { query: geClothesByIdsQuery(ids) });
        return response.data.data.ClothesIds;
    }
);
