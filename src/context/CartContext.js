import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export default function CartContextProvider(props) {
    const [cart, setCart] = useState([]);
    const [cartLength, setCartLength] = useState();

    return (
        <CartContext.Provider value={{ cart, setCart, cartLength, setCartLength }}>
            {props.children}
        </CartContext.Provider>
    );
}

