import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import swal from 'sweetalert';

export default function CartPage() {
    const { cart, setCart, setCartLength } = useContext(CartContext);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user-info'))


    function Confirmar() {

        cart.forEach((item, index) => {
            const total = Number(item.quantity * item.price);
            fetch('http://localhost:8000/api/pedido', {
                method: "POST",
                body: JSON.stringify({
                    user_id: user.id,
                    products: [item._id],
                    quantity: item.quantity,
                    size: item.size ? item.size : 'S',
                    total: total
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al registrar pedido');
                    }
                    console.log('Response:', response.json());
                    setCart([]);
                    swal('Pedido registrado!', 'Gracias por comprar en nuestra página', "success");
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error:', error);
                    return error;
                });
        });
    }
    useEffect(() => {
        setCartLength(cart.length)
    }, [cart, setCartLength])
    const handleQuantity = (id) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                const newQuantity = item.quantity - 1;
                return { ...item, quantity: newQuantity >= 1 ? newQuantity : 1 };
            } else {
                return item;
            }
        });
        setCart(updatedCart);
    };

    const handleIncreaseQuantity = (id) => {

        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                const newQuantity = item.quantity + 1;
                return { ...item, quantity: newQuantity, size: item.size || 'S' };
            } else {
                return item;
            }
        });
        setCart(updatedCart);
    };

    const handleDelete = (id) => {
        setCart(cart.filter(item => item.id !== id));
    }
    const handleSize = (event, id) => {

        const setSize = event.target.value;
        console.log(event.target.value);
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, size: setSize };
            } else {
                return item;
            }
        });
        setCart(updatedCart);
    };



    return (
        <div>
            <h1>Confirmar pedido: </h1>
            {cart.map((item, index) => (
                <table className='table' key={index}>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Talla</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>

                                <div className="input-group input-group-lg w-25 mx-auto">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-secondary" type="button" onClick={() => handleQuantity(item.id)}>-</button>
                                    </div>
                                    <input type="number" className="form-control mx-auto" value={item.quantity || 1} readOnly />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                    </div>
                                </div>

                            </td>
                            <td>
                                <select name='size' defaultValue={'s'} className="form-control" onChange={(e) => handleSize(e, item.id)}>
                                    <option value="S" >S</option>
                                    <option value="M" >M</option>
                                    <option value="L" >L</option>
                                    <option value="XL" >XL</option>
                                </select>


                            </td>
                            <td>
                                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            ))}
            <button className='btn btn-primary' onClick={Confirmar}>Confirmar</button>
        </div>
    );
}
