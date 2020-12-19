import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import { useDataLayerValue } from '../../utils/DataLayer'
import Cookies from 'universal-cookie'

function Navbar() {

    const [{ isAuth }, dispatch] = useDataLayerValue()
    console.log(isAuth);

    const cookies = new Cookies()
    

    const logout = () => {
        cookies.set('token', '', { maxAge: 0 })
        dispatch({
            type: "SET_AUTH",
            payload: false
        })
    }

    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/" className="logoName"><span>Friends</span></Link>
            </div>
            <div className="actions">
                
                { !isAuth && 
                <Link to="/login"><button className="loginBtn">Log in</button></Link>}
                { !isAuth && 
                <Link to="/signup"><button className="signupBtn">Sign up</button></Link>}

                { isAuth && 
                <Link to="/"><button onClick={logout} className="signupBtn">logout</button></Link>}
                
            </div>
        </div>
    )
}

export default Navbar
