import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Input from '../components/Input';


export default function Signup() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [city, setcity] = useState('');
    const [adress, setAdress] = useState('');
    const navigate = useNavigate();


    function handleLogin(name, value) {
        setName(value)
    }
    function handleEmail(name, value) {
        setEmail(value)
    }
    function handleAdress(value) {
        console.log(value)
        setcity(value)
    }
    function handleAdress2(value) {
        console.log(value)
        setAdress(value)
    }
    function handlePass(name, value) {
        setPassword(value)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(city);
        const baseUrl = 'http://localhost:8000/api/register';
        try {
            const response = await fetch(baseUrl, {
                method: "POST",
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
                },
            });
            const jsonData = await response.json();
            if (jsonData.success === true) {
                console.log('Sign: ')
                console.log(jsonData.user.id)
                localStorage.setItem("user-info", JSON.stringify(jsonData.user));
                localStorage.setItem('user-id', JSON.stringify(jsonData.user.id));
                navigate('/');
            } else {
                swal('error email ya registrado');
            }

        } catch (error) {
            console.log(error);
            swal("correo ya esta en uso")
        }
    }



    return (
        <div>
            <h1>Registro</h1>
            <form action='/register' method='post' className='col-sm-6 offset-sm-3'>

                <div>
                    <Input
                        attribute={{
                            id: 'name',
                            name: 'name',
                            placeholder: 'Nombre',
                            type: 'text',

                        }}
                        handleChange={handleLogin} />
                </div>
                <div>
                    <Input
                        attribute={{
                            id: 'password',
                            name: 'password',
                            type: 'password',
                            placeholder: 'contraseña'

                        }}
                        handleChange={handlePass} />
                </div>
                <div>
                    <Input
                        attribute={{
                            id: 'email',
                            name: 'email',
                            type: 'email',
                            placeholder: 'correo'
                        }}
                        handleChange={handleEmail} />
                </div>
                <div>
                    <Input
                        attribute={{
                            id: 'city',
                            name: 'city',
                            type: 'text',
                            placeholder: 'ciudad'
                        }}
                        handleChange={handleAdress} />
                </div>
                <div>
                    <Input
                        attribute={{
                            id: 'adress',
                            name: 'adress',
                            type: 'adress',
                            placeholder: 'Calle Nº '
                        }}
                        handleChange={handleAdress2} />
                </div>


                <button onClick={handleSubmit}>Registrarse</button>

            </form>
        </div>
    )
}
