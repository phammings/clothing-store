import React from "react";
import { Row, Col, Layout, Pagination, Typography } from "antd";

import ClothesCheckbox from "./components/ClothesCheckbox";
import ClothesRadio from "./components/ClothesRadio";
import ClothesSorter from "./components/ClothesSorter";
import { gender, brands, price } from "./ClothesData";
import "./Clothes.css";

const CheckboxCategoryFilter = {
    BRANDS: "BRANDS",
    GENDERS: "GENDERS"
};

const Menu = () => {
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
                        </Row>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    );
};

export default Menu;
