import React from "react";
import { Card, Col, Rate } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { useCart } from "../../hooks/useCart";
import "./ClothesCard.css";

const ClothesCard = ({ clothes, colSpan, edit, onOpenDelete }) => {
    const { addToCart } = useCart(clothes.id);

    const onClickAddToCart = (event) => {
        event.preventDefault();
        addToCart();
    };

    return (
        <Col span={colSpan}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
            <a href={`${"/product"}/${clothes.id}`}>
                <Card
                    className={"clothes-card"}
                    cover={<img className={"clothes-card-image"} alt={clothes.clothesTitle} src={clothes.filename} />}
                    hoverable
                    actions={
                        edit
                            ? [
                                  <a href={`${"/account/admin/perfumes"}/${clothes.id}`}>
                                      <button icon={<EditOutlined />}>Edit</button>
                                  </a>,
                                  <button icon={<DeleteOutlined />} onClick={() => onOpenDelete(clothes)} danger>
                                      Delete
                                  </button>
                              ]
                            : [
                                <button className="button" onClick={onClickAddToCart}>
                                    <i className="fas fa-shopping-cart"></i> Add to cart
                                </button>
                            
                              ]
                    }
                >
                    <div className={"clothes-card-rate"}>
                        <Rate defaultValue={clothes.clothesRating === 0 ? 5 : clothes.clothesRating} disabled />
                        <p>{clothes.reviewsCount} reviews</p>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <h3>{clothes.clothesTitle}</h3>
                        <p>{clothes.brand}</p>
                    </div>

                    <p className={"clothes-card-price"}>${clothes.price}.00</p>
                </Card>
            </a>
        </Col>
    );
};

export default ClothesCard;
