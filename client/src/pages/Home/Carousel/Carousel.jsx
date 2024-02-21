import React from "react";
import { Carousel } from "antd";

import { brandsItem } from "./CarouselData";
import CarouselItem from "./CarouselItem/CarouselItem";
import "./Carousel.css";

const SliderBrands = () => {
    return (
        <div className={"brands-wrapper"}>
            <Carousel className={"brands-carousel"} autoplay>
                <CarouselItem brands={brandsItem.slice(0, 4)} />
                <CarouselItem brands={brandsItem.slice(4, 8)} />
                <CarouselItem brands={brandsItem.slice(8, 12)} />
            </Carousel>
        </div>
    );
};

export default SliderBrands;
