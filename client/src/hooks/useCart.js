import { useHistory } from "react-router-dom";
import { CART } from "../constants/routeConstants";

export const useCart = (clothId) => {
    const history = useHistory();

    const addToCart = () => {
        let data = localStorage.getItem("clothes");
        let cart = data ? new Map(JSON.parse(data)) : new Map();

        if (cart.has(clothId)) {
            cart.set(clothId, cart.get(clothId) + 1);
        } else {
            cart.set(clothId, 1);
        }
        localStorage.setItem("clothes", JSON.stringify(Array.from(cart.entries())));
        history.push(CART);
    };

    return { addToCart };
};

