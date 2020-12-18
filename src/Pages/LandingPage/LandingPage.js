import React from 'react'
import './landingPage.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'

function LandingPage() {

    


    return (
        <div className="landingPage">
            <div className="separater"></div>
            <div className="hero-area">
                <div className="text">
                    <span className="hero_title">Together Friends</span>
                    <span className="hero_description">
                        Join with your friends doing all the fun and getting to know
                        more about digital world, looking forward to get started 
                        right now
                    </span>
                    <Link to="/friends"><button>Join your room </button></Link>
                </div>
                <div className="cover"></div>
            </div>
        </div>
    )
}

export default LandingPage
