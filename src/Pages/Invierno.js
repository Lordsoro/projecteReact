import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CartContext } from '../context/CartContext';
import swal from 'sweetalert';


export default function Verano() {
    const [data, setData] = useState([]);
    const { cart, setCart, setCartLength, } = useContext(CartContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/api/list')
            .then((response) => response.json())
            .then((data) => setData(data));
    }, [])

    useEffect(() => {
        setCartLength(cart.length)
    }, [cart, setCartLength])

    useEffect(() => {
        const user = localStorage.getItem("user-info");
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleClick = (item) => {
        if (!isLoggedIn) {
            swal("Solo los usuarios pueden añadir productos al carrito");
            return;
        }

        const existingItem = cart.find(i => i.id === item.id);
        if (existingItem) {
            setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));

        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }


    };

    return (


        <div className="row row-cols-1 row-cols-lg-3 g-4 m-2">
            {
                data.map((item) =>
                    <div key={item.id} className="col">
                        <div className="itemCard" >
                            <Card style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={require('../images/benjamin.jpg')} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handleClick(item)}>Añadir al carrito</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                )
            }

        </div >


    )
}

