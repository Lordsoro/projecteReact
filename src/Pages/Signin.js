import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Input from '../components/Input';


export default function Signup() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const navigate = useNavigate();


    function handleLogin(name, value) {

        setName(value)

    }
    function handleEmail(name, value) {

        setEmail(value)

    }
    function handleCountry(value) {
        console.log(value)
        setCountry(value)
    }

    function handlePass(name, value) {

        setPassword(value)

    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(country);
        const baseUrl = 'http://localhost:8000/api/register';
        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    country: country
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const jsonData = await response.json();
            if (jsonData.success === true) {
                localStorage.setItem("user-info", JSON.stringify(jsonData.user));
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
                    <select id="country" name="country" defaultValue="spain" onChange={(e) => handleCountry(e.target.value)}>

                        <option value="spain" selected>España</option>
                        <option value="uk">Reino Unido</option>
                        <option value="italia">Italia</option>
                        <option value="francia">Francia</option>

                    </select>

                </div>

                <button onClick={handleSubmit}>Registrarse</button>

            </form>
        </div>
    )
}
