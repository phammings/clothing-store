import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Layout, Pagination, Typography } from "antd";

import { selectIsClothesLoading, selectClothes } from "../../redux-toolkit/clothes/clothes-selector";
import { fetchClothesByFilterParams, fetchClothesByInputText } from "../../redux-toolkit/clothes/clothes-thunks";
import { resetClothesState } from "../../redux-toolkit/perfumes/perfumes-slice";
import { useSearch } from "../../hooks/useSearch";
import { MAX_PAGE_VALUE, usePagination } from "../../hooks/usePagination";

import ClothesCheckbox from "./components/ClothesCheckbox";
import ClothesRadio from "./components/ClothesRadio";
import ClothesSorter from "./components/ClothesSorter";
import { gender, brands, price } from "./ClothesData";
import "./Clothes.css";

const CheckboxCategoryFilter = {
    BRANDS: "BRANDS",
    GENDERS: "GENDERS"
};

const Clohtes = () => {
    const dispatch = useDispatch();
    const clothes = useSelector(selectClothes);
    const isClothesLoading = useSelector(selectIsClothesLoading);
    const location = useLocation();
    const [filterParams, setFilterParams] = useState({
        brands: [],
        genders: [],
        prices: [1, 999]
    });
    const [sortByPrice, setSortByPrice] = useState(false);
    const { currentPage, totalElements, handleChangePagination, resetPagination } = usePagination();
    const { searchValue, searchTypeValue, resetFields, form, onSearch, handleChangeSelect } = useSearch();

    useEffect(() => {
        const clohtesData = location.state.id;

        if (clohtesData === "female" || clohtesData === "male") {
            dispatch(
                fetchClothesByFilterParams({
                    ...filterParams,
                    genders: [...filterParams.genders, clohtesData],
                    sortByPrice,
                    currentPage: 0
                })
            );
            setFilterParams((prevState) => ({ ...prevState, genders: [...prevState.genders, perfumeData] }));
        } else if (perfumeData === "all") {
            dispatch(fetchClothesByFilterParams({ ...filterParams, sortByPrice, currentPage: 0 }));
        } else {
            dispatch(
                fetchClothesByFilterParams({
                    ...filterParams,
                    brands: [...filterParams.brands, clohtesData],
                    sortByPrice,
                    currentPage: 0
                })
            );
            setFilterParams((prevState) => ({ ...prevState, brands: [...prevState.brands, clohtesData] }));
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
        if (CheckboxCategoryFilter.BRANDS === category) {
            setFilterParams((prevState) => {
                const filter = { ...prevState, brands: [...checkedValues] };
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
                        <ClothesCheckbox
                            title={"Brand"}
                            onChange={onChangeCheckbox}
                            data={brands}
                            category={CheckboxCategoryFilter.BRANDS}
                            selectedValues={filterParams.BRANDS}
                        />
                        <ClothesCheckbox
                            title={"Gender"}
                            onChange={onChangeCheckbox}
                            data={gender}
                            category={CheckboxCategoryFilter.GENDERS}
                            selectedValues={filterParams.genders}
                        />
                        <ClothesRadio title={"Price"} onChange={onChangeRadio} data={price} />
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
                                <ClothesSorter onChange={handleChangeSortPrice} sortByPrice={sortByPrice} />
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
                            {isClohtesLoading ? (
                                <Loader />
                            ) : (
                                clohtes.map((clothe) => (
                                    <ClothesCard key={clothe.id} clohtes={clothe} colSpan={8} />
                                ))
                            )}
                        </Row>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    );
};

export default Clohtes;
