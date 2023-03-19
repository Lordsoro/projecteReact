import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
const Product = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('M');
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/list/${id}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, [id]);
    const handleAddToCart = (event) => {
        console.log(`Adding product with ID ${id} to cart:`);
        console.log(`Quantity: ${quantity}`);
        console.log(`Size: ${size}`);
        event.preventDefault();
    };

    return (
        <div>
            <h2>Producto: {data.name}</h2>
            <p>{data.description}</p>
            <p>
                Quantity:
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </p>
            <p>
                Size:
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </p>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <Link
                to={{
                    pathname: "/cart",
                    state: { id, size, quantity }
                }}
            >
                <button className="btn btn-outline-primary">Confirmar compra</button>
            </Link>
        </div>
    );
};

export default Product;
