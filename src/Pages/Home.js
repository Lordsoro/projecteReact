import React from 'react'
import Footer from '../components/Footer'
import { Route, Routes } from 'react-router-dom';
import Invierno from './Invierno';
import Verano from './Verano';
import DetallesInf from '../components/DetallesInf';
import Navbar from '../components/Navbar';
import Login from './Login';
import Signin from './Signin';
import Cart from './Cart'
import Index from './Index';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartContextProvider from '../context/CartContext';


export default function Home() {

    return (
        <div>Bienvenidos. descuentos de hasta el 20%
            <h1>Outfit Circus</h1>
            <CartContextProvider>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Index />} />
                    <Route path='/invierno' element={<Invierno />} />
                    <Route path='/verano' element={<Verano />} >
                        <Route path='detalles' element={<DetallesInf />} />
                    </Route>
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Signin />} />

                </Routes>
                <Footer />
            </CartContextProvider>
        </div>
    )
}
