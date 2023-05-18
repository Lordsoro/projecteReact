import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import swal from 'sweetalert';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleLogin(name, value) {
        setEmail(value)
    }
    function handlePass(name, value) {
        setPassword(value)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const baseUrl = 'http://localhost:8000/api/login';

        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            const jsonData = await response.json();
            if (jsonData.success === true) {
                console.log("Login: ")
                console.log(jsonData.user._id)
                localStorage.setItem("user-info", JSON.stringify(jsonData));
                localStorage.setItem('user-id', JSON.stringify(jsonData.user._id));
                navigate('/');
            } else {
                swal({ icon: "warning", text: 'email o contraseña incorrectos' });
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h1>Login</h1>
            <form className='col-sm-6 offset-sm-3'>

                <div>
                    <Input
                        attribute={{
                            id: 'email',
                            name: 'email',
                            placeholder: 'Correo',
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

                <button onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}
