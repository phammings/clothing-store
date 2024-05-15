// ClothList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Col, notification, Pagination, Row } from "antd";

import { selectIsClothDeleted } from "../../../../state-redux/admin/admin-selector";
import { selectIsClothesLoading, selectClothes } from "../../../../state-redux/clothes/clothes-selector";
import { fetchClothes, fetchClothesByInputText } from "../../../../state-redux/clothes/clothes-thunks";
import { resetClothesState } from "../../../../state-redux/clothes/clothes-slice";
import { resetAdminState } from "../../../../state-redux/admin/admin-slice";
import ContentTitle from "../../../ContentTitle/ContentTitle";
import SelectSearchData from "../../../SelectSearchData/SelectSearchData";
import InputSearch from "../../../InputSearch/InputSearch";
import ClothCard from "../../../ClothCard/ClothCard";
import { deleteCloth } from "../../../../state-redux/admin/admin-thunks";
import { LoadingStatus } from "../../../../constants/types/types";
import DeleteModal from "./DeleteModal/DeleteModal";
import Spinner from "../../../Spinner/Spinner";
import { MAX_PAGE_VALUE, usePagination } from "../../../../hooks/usePagination";
import { useSearch } from "../../../../hooks/useSearch";
import "./ClothList.css";

const ClothList = () => {
    const dispatch = useDispatch();
    const clothes = useSelector(selectClothes);
    const isClothesLoading = useSelector(selectIsClothesLoading);
    const isClothDeleted = useSelector(selectIsClothDeleted);
    const [clothInfo, setClothInfo] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { currentPage, totalElements, handleChangePagination } = usePagination();
    const { searchValue, searchTypeValue, onSearch, handleChangeSelect } = useSearch();
    const [deleteClothError, setDeleteClothError] = useState(false);
    useEffect(() => {
        dispatch(fetchClothes(0));

        return () => {
            dispatch(resetClothesState());
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);

    useEffect(() => {
        if (isClothDeleted) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Cloth deleted",
                description: "Cloth successfully deleted!"
            });
            // Remove the deleted cloth from the list
            setClothInfo(null);
        }
    }, [isClothDeleted]);

    const changePagination = (page, pageSize) => {
        if (searchValue) {
            dispatch(
                fetchClothesByInputText({ searchType: searchTypeValue, text: searchValue, currentPage: page - 1 })
            );
        } else {
            dispatch(fetchClothes(page - 1));
        }
        handleChangePagination(page, pageSize);
    };

    const showDeleteModalWindow = (cloth) => {
        setIsModalVisible(true);
        setClothInfo(cloth);
    };

    const deleteClothHandler = () => {
        dispatch(deleteCloth(clothInfo.id));
        setIsModalVisible(false); // Close the delete modal after deleting the cloth
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <ContentTitle title={"List of clothes"} titleLevel={4} icon={<UnorderedListOutlined />} />
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={9}>
                            <SelectSearchData handleChangeSelect={handleChangeSelect} />
                        </Col>
                        <Col span={10}>
                            <InputSearch onSearch={onSearch} />
                        </Col>
                    </Row>
                    {isClothesLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <Row style={{ marginTop: 16, marginBottom: 16 }}>
                                <Col span={16}>
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
                                {clothes.map((cloth) => (
                                    <ClothCard
                                        key={cloth.id}
                                        cloth={cloth}
                                        colSpan={8}
                                        onDelete={() => showDeleteModalWindow(cloth)} // Pass a function to open the delete modal
                                        edit
                                    />
                                ))}
                            </Row>
                            <Row style={{ marginTop: 16, marginBottom: 16 }}>
                                <Pagination
                                    current={currentPage}
                                    pageSize={MAX_PAGE_VALUE}
                                    total={totalElements}
                                    showSizeChanger={false}
                                    onChange={changePagination}
                                />
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
            <DeleteModal
                visible={isModalVisible}
                deleteClothHandler={deleteClothHandler}
                handleCancel={handleCancel}
                clothInfo={clothInfo}
            />
        </div>
    );
};

export default ClothList;
