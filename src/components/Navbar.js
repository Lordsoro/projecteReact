import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user-info'))
    const { cartLength } = useContext(CartContext);
    const [collapse, setCollapse] = useState(true);

    function Logout() {
        localStorage.removeItem("user-info")
        navigate('/')
    }

    function handleCollapse() {
        setCollapse(!collapse);
    }

    function handleMenuClick() {
        if (!collapse) {
            handleCollapse();
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button type="button" className="navbar-toggler" onClick={handleCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${collapse ? '' : 'show'}`} id="navbarCollapse">
                        <div className="navbar-nav">
                            <li id='logo' onClick={handleMenuClick}><Link to="/">Home</Link></li>
                            <li onClick={handleMenuClick}><Link to='/invierno'>Outfits Invierno</Link></li>
                            <li onClick={handleMenuClick}><Link to="/verano">Outfits Verano</Link></li>
                            <li onClick={handleMenuClick}><Link to="/primavera">Outfits EntreTiempo</Link></li>
                            <li onClick={handleMenuClick}><a href="/accesorios">Accesorios</a></li>

                        </div>
                        <div className="navbar-nav ms-auto">
                            {user ? (
                                <>
                                    <li className='userloged'>¡Bienvenido, {user.user}!</li>
                                    <li className='userloged'><Link to="/cart">🛒<span>{cartLength}</span></Link></li>
                                    <li className='userloged' onClick={Logout}><Link to="/">Logout</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='userloged'>Registrate ➪</li>
                                    <li className='userloged'><Link to="/login">Login</Link></li>
                                    <li className='userloged'><Link to="/register">Sign in</Link></li>

                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    );
}
