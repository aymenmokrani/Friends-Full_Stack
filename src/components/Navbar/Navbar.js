import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'


function Navbar() {
    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/" className="logoName"><span>Friends</span></Link>
            </div>
            <div className="actions">
                <Link to="/login"><button className="loginBtn">Log in</button></Link>
                <Link to="/signup"><button className="signupBtn">Sign up</button></Link>
            </div>
        </div>
    )
}

export default Navbar
