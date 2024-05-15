// ClothCard.jsx
import React from "react";
import { Button, Card, Col, Rate, Typography } from "antd";
import { Link } from "react-router-dom";
import Meta from "antd/lib/card/Meta";
import { DeleteOutlined, EditOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import { ACCOUNT_ADMIN_CLOTHES, PRODUCT } from "../../constants/routeConstants";
import { useCart } from "../../hooks/useCart";
import "./ClothCard.css";

const ClothCard = ({ cloth, colSpan, edit, onDelete }) => { // Update props to include onDelete
    const { addToCart } = useCart(cloth.id);

    const onClickAddToCart = (event) => {
        event.preventDefault();
        addToCart();
    };
    const imageUrl = `http://localhost:8080/static/assets/images/${cloth.filename}`;
    return (
        <Col span={colSpan}>
            <Link to={`${PRODUCT}/${cloth.id}`}>
                <Card
                    className={"cloth-card"}
                    cover={<img className={"cloth-card-image"} alt={cloth.title} src={imageUrl} />}
                    hoverable
                    actions={
                        edit
                            ? [
                                  <Link to={`${ACCOUNT_ADMIN_CLOTHES}/${cloth.id}`}>
                                      <Button icon={<EditOutlined />}>Edit</Button>
                                  </Link>,
                   <Button
                   style={{ zIndex: 9 }}
                   icon={<DeleteOutlined />}
                   onClick={(event) => {
                       event.preventDefault(); // Prevent default action
                       event.stopPropagation(); // Stop event propagation
                       onDelete(cloth.id); // Call onDelete with cloth id
                   }}
                   danger
               >
                   Delete
               </Button>
               
                            
                              ]
                            : [
                                  <Button icon={<ShoppingCartOutlined />} onClick={onClickAddToCart}>
                                      Add to cart
                                  </Button>
                              ]
                    }
                >
                    <div className={"cloth-card-rate"}>
                        <Rate defaultValue={cloth.clothRating === 0 ? 5 : cloth.clothRating} disabled />
                        <Typography.Text>{cloth.reviewsCount} reviews</Typography.Text>
                    </div>
                    <Meta title={cloth.title} description={cloth.clother} style={{ textAlign: "center" }} />
                    <Typography.Text className={"cloth-card-price"}>${cloth.price}.00</Typography.Text>
                </Card>
            </Link>
        </Col>
    );
};

export default ClothCard;
