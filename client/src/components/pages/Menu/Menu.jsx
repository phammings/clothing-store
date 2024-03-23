import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Layout, Pagination, Typography } from "antd";
import { useLocation } from "react-router-dom";

import MenuCheckboxSection from "./MenuSection/MenuCheckboxSection";
import { selectIsClothesLoading, selectClothes } from "../../../state-redux/clothes/clothes-selector";
import { fetchClothesByFilterParams, fetchClothesByInputText } from "../../../state-redux/clothes/clothes-thunks";
import { resetClothesState } from "../../../state-redux/clothes/clothes-slice";
import MenuRadioSection from "./MenuSection/MenuRadioSection";
import MenuSorter from "./MenuSorter/MenuSorter";
import ClothCard from "../../ClothCard/ClothCard";
import SelectSearchData from "../../SelectSearchData/SelectSearchData";
import InputSearch from "../../InputSearch/InputSearch";
import Spinner from "../../Spinner/Spinner";
import { MAX_PAGE_VALUE, usePagination } from "../../../hooks/usePagination";
import { gender, clother, price } from "./MenuData";
import { useSearch } from "../../../hooks/useSearch";
import "./Menu.css";

const CheckboxCategoryFilter = {
    CLOTHERS: "CLOTHERS",
    GENDERS: "GENDERS"
};

const Menu = () => {
    const dispatch = useDispatch();
    const clothes = useSelector(selectClothes);
    const isClothesLoading = useSelector(selectIsClothesLoading);
    const location = useLocation();
    const [filterParams, setFilterParams] = useState({
        clothers: [],
        genders: [],
        prices: [1, 999]
    });
    const [sortByPrice, setSortByPrice] = useState(false);
    const { currentPage, totalElements, handleChangePagination, resetPagination } = usePagination();
    const { searchValue, searchTypeValue, resetFields, form, onSearch, handleChangeSelect } = useSearch();

    useEffect(() => {
        const clothData = location.state.id;

        if (clothData === "female" || clothData === "male") {
            dispatch(
                fetchClothesByFilterParams({
                    ...filterParams,
                    genders: [...filterParams.genders, clothData],
                    sortByPrice,
                    currentPage: 0
                })
            );
            setFilterParams((prevState) => ({ ...prevState, genders: [...prevState.genders, clothData] }));
        } else if (clothData === "all") {
            dispatch(fetchClothesByFilterParams({ ...filterParams, sortByPrice, currentPage: 0 }));
        } else {
            dispatch(
                fetchClothesByFilterParams({
                    ...filterParams,
                    clothers: [...filterParams.clothers, clothData],
                    sortByPrice,
                    currentPage: 0
                })
            );
            setFilterParams((prevState) => ({ ...prevState, clothers: [...prevState.clothers, clothData] }));
        }
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetClothesState());
        };
    }, []);

    useEffect(() => {
        resetPagination();
    }, [filterParams, sortByPrice]);

    const onChangeCheckbox = (checkedValues, category) => {
        if (CheckboxCategoryFilter.CLOTHERS === category) {
            setFilterParams((prevState) => {
                const filter = { ...prevState, clothers: [...checkedValues] };
                dispatch(fetchClothesByFilterParams({ ...filter, sortByPrice, currentPage: 0 }));
                return filter;
            });
        } else if (CheckboxCategoryFilter.GENDERS === category) {
            setFilterParams((prevState) => {
                const filter = { ...prevState, genders: [...checkedValues] };
                dispatch(fetchClothesByFilterParams({ ...filter, sortByPrice, currentPage: 0 }));
                return filter;
            });
        }
        resetFields();
    };

    const onChangeRadio = (event) => {
        setFilterParams((prevState) => {
            const filter = { ...prevState, prices: event.target.value };
            dispatch(fetchClothesByFilterParams({ ...filter, sortByPrice, currentPage: 0 }));
            return filter;
        });
        resetFields();
    };

    const handleChangeSortPrice = (event) => {
        dispatch(fetchClothesByFilterParams({ ...filterParams, sortByPrice: event.target.value, currentPage: 0 }));
        setSortByPrice(event.target.value);
        resetFields();
    };

    const changePagination = (page, pageSize) => {
        if (searchValue) {
            dispatch(
                fetchClothesByInputText({ searchType: searchTypeValue, text: searchValue, currentPage: page - 1 })
            );
        } else {
            dispatch(fetchClothesByFilterParams({ ...filterParams, sortByPrice, currentPage: page - 1 }));
        }
        handleChangePagination(page, pageSize);
    };

    return (
        <Layout>
            <Layout.Content className={"login-content"}>
                <Typography.Title level={2}>Clothes</Typography.Title>
                <Row gutter={32}>
                    <Col span={6}>
                        <MenuCheckboxSection
                            title={"Brand"}
                            onChange={onChangeCheckbox}
                            data={clother}
                            category={CheckboxCategoryFilter.CLOTHERS}
                            selectedValues={filterParams.clothers}
                        />
                        <MenuCheckboxSection
                            title={"Gender"}
                            onChange={onChangeCheckbox}
                            data={gender}
                            category={CheckboxCategoryFilter.GENDERS}
                            selectedValues={filterParams.genders}
                        />
                        <MenuRadioSection title={"Price"} onChange={onChangeRadio} data={price} />
                    </Col>
                    <Col span={18}>
                        <Row>
                            <Col span={8} style={{ marginRight: "auto" }}>
                                <SelectSearchData handleChangeSelect={handleChangeSelect} />
                            </Col>
                            <Col span={10}>
                                <InputSearch onSearch={onSearch} form={form} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16, marginBottom: 16 }}>
                            <Col span={8} style={{ marginRight: "auto"}}>
                                <MenuSorter onChange={handleChangeSortPrice} sortByPrice={sortByPrice} />
                            </Col>
                            <Col span={12}>
                                <Pagination
                                    current={currentPage}
                                    pageSize={MAX_PAGE_VALUE}
                                    total={totalElements}
                                    showSizeChanger={false}
                                    onChange={changePagination}
                                />
                            </Col>
                        </Row>
                        <Row gutter={[32, 32]}>
                            {isClothesLoading ? (
                                <Spinner />
                            ) : (
                                clothes.map((cloth) => (
                                    <ClothCard key={cloth.id} cloth={cloth} colSpan={8} />
                                ))
                            )}
                        </Row>
                        <Row style={{ marginTop: 16, marginBottom: 16, display: "flex", justifyContent: "center" }}>
                            <Pagination
                                current={currentPage}
                                pageSize={MAX_PAGE_VALUE}
                                total={totalElements}
                                showSizeChanger={false}
                                onChange={changePagination}
                            />
                        </Row>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    );
};

export default Menu;
