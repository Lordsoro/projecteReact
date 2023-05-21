import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import Input from '../components/Input';

export default function Profile() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [city, setcity] = useState('');
    const [adress, setAdress] = useState('');
    const [editing, setEditing] = useState(false);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    function handleName(name, value) {
        setName(value)
    }
    function handleEmail(name, value) {
        setEmail(value)
    }
    function handleAdress(value) {
        console.log(value)
        setAdress(value)
    }
    function handlePass(name, value) {
        setPassword(value)
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem('user-id'));
                const response = await fetch(`http://localhost:8000/api/profile/${userId}`);
                const userData = await response.json();
                setName(userData.user.name);
                setPassword(userData.password);
                setEmail(userData.user.email);
                setcity(userData.user.city);
                setAdress(userData.user.adress)

                const ordersResponse = await fetch(`http://localhost:8000/api/orders/${userId}`);
                const ordersData = await ordersResponse.json();
                if (Array.isArray(ordersData)) {
                    setOrders(ordersData);
                } else {
                    setOrders([]);
                }
                console.log('User orders: ');
                console.log(orders);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData()
            .then(() => {
                console.log("Profile Name: " + name);

            });
    }, []);


    async function handleSubmit(event) {
        event.preventDefault();
        const userId = JSON.parse(localStorage.getItem('user-id'));
        const baseUrl = `http://localhost:8000/api/profile/${userId}`;
        try {
            if (!password) {
                swal('Por favor, introduce una contraseña');
                return;
            }
            const response = await fetch(baseUrl, {
                method: 'PUT',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    city: city,
                    adress: adress
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const jsonData = await response.json();
            if (jsonData.success === true) {
                localStorage.setItem('user-info', JSON.stringify(jsonData.user));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            swal('error al editar');
        }
    }
    function handleCity(city) {
        console.log(city)
        setcity(city)
    }
    function handleEditClick() {
        if (editing === true) {
            setEditing(false);
        } else {
            setEditing(true);
        }

    }
    async function handleDeleteAccount() {
        try {
            const userId = JSON.parse(localStorage.getItem('user-id'));
            console.log('Delete id: ')
            console.log(userId)
            const response = await fetch(`http://localhost:8000/api/profile/${userId}`, {
                method: 'DELETE'
            });
            const jsonData = await response.json();
            if (jsonData.success === true) {
                localStorage.removeItem('user-info');
                localStorage.removeItem('user-id');
                navigate('/');
            } else {
                swal('Error al eliminar la cuenta');
            }
        } catch (error) {
            console.log(error);
            swal('Error al eliminar la cuenta');
        }
    }

    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div>
                <h1>Perfil</h1>
                {editing ? (
                    <form action="/profile" method="post" className="col-sm-6 offset-sm-3">
                        <p>Introduzca la contraseña para guardar los cambios</p>
                        <div>
                            <Input
                                attribute={{
                                    id: 'name',
                                    name: 'name',
                                    placeholder: 'Nombre',
                                    type: 'text',

                                }}
                                handleChange={handleName}
                            />
                        </div>
                        <div>
                            <Input
                                attribute={{
                                    id: 'password',
                                    name: 'password',
                                    type: 'password',
                                    placeholder: 'contraseña'

                                }}
                                handleChange={handlePass}
                            />
                        </div>
                        <div>
                            <Input
                                attribute={{
                                    id: 'email',
                                    name: 'email',
                                    type: 'email',
                                    placeholder: 'correo'
                                }}
                                handleChange={handleEmail}
                            />
                        </div>
                        <div>
                            <Input
                                attribute={{
                                    id: 'city',
                                    name: 'city',
                                    type: 'text',
                                    placeholder: 'ciudad'
                                }}
                                handleChange={handleCity} />
                        </div>
                        <div>
                            <Input
                                attribute={{
                                    id: 'adress',
                                    name: 'adress',
                                    type: 'adress',
                                    placeholder: 'Calle Nº '
                                }}
                                handleChange={handleAdress} />
                        </div>
                        <div>
                            <Button className='m-2' onClick={handleSubmit}>Guardar</Button>
                            <Button onClick={handleEditClick}>Cancelar</Button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-danger">Borrar cuenta</button>
                        </div>
                    </form>

                ) : (
                    <div className="text-center">
                        <div className="d-inline-block text-left">
                            <ul className="list-group">
                                <li className="bg-secondary list-group-item custom-list-item">Nombre:</li>
                                <li className="list-group-item custom-list-item" >{name}</li>
                                <li className="bg-secondary list-group-item custom-list-item">Email:</li>
                                <li className="list-group-item custom-list-item" >{email}</li>
                                <li className="bg-secondary list-group-item custom-list-item">País:</li>
                                <li className="list-group-item custom-list-item">{city}</li>
                            </ul>
                        </div>
                        <div className="d-inline-block text-left">
                            {orders.length > 0 ? (
                                <ul className="list-group">
                                    <li className="list-group-item custom-list-item">Pedidos realizados: </li>
                                    {orders.map((order) => (
                                        <li className="list-group-item custom-list-item" key={order.id}>
                                            {order.details}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <ul className="list-group">
                                    <li className="bg-secondary list-group-item custom-list-item">No se han realizado pedidos</li>
                                </ul>
                            )}
                        </div>
                        <div className="mt-4">
                            <Button onClick={handleEditClick}>Editar Perfil</Button>
                        </div>
                        <div className="mt-4">
                            <button className="btn btn-danger" onClick={handleDeleteAccount}>Borrar cuenta</button>
                        </div>
                    </div>

                )}
            </div>
        </div>



    );
}
