import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function ItemPage() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [items, setItems] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8000/api/list/${id}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, [id]);

    const handleQuantityChange = event => {
        setQuantity(event.target.value);
    };

    const handleSize = event => {
        setSize(event.target.value);
    };

    const addToCart = (product) => {
        const exist = items.find(x => x.id === product.id);
        if (exist) {
            setItems(items.map)
        }
    };

    return (
        <div className="container">
            <div className="card">
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img src={data.image} alt="product image" />
                <h2>{data.name}</h2>
                <p>{data.description}</p>
                <h4>Price: {data.price} €</h4>
                <form className="col-sm-4 offset-sm-4">
                    <label>Quantity: </label>
                    <input type="number" value={quantity} onChange={handleQuantityChange} />
                    <label>Select size</label>
                    <select className="form-control" value={size} onChange={handleSize}>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>
                    <button className="btn btn-outline-primary" onClick={addToCart} >
                        Añadir al carrito
                    </button>
                </form>
                <Link
                    to={{
                        pathname: "/cart",
                        state: items
                    }}
                >
                    <button className="btn btn-outline-primary">Confirmar compra</button>
                </Link>
            </div>
        </div>
    );
}
