import React, { useEffect } from 'react'
import './loginPage.scss'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useDataLayerValue } from '../../utils/DataLayer'
    

function LoginPage() {

    const cookies = new Cookies()

    const {register, handleSubmit} = useForm()
    const history = useHistory()
    const [{ isAuth }, dispatch] = useDataLayerValue()

    
    useEffect(() => {
        isAuth && history.push('/')
    })

    const onSubmit = async data => {
        try {
            const result = await axios.post('api/login', data)
            const token = result.data.token;
            cookies.set('token', token)
            dispatch({
                type: "SET_AUTH",
                payload: true
            })
            history.push('/friends')
        }
        catch(err) {
            console.log(err.response.data);
        }
    }

    return (
        <div className="loginPage">
            <form onSubmit={handleSubmit(onSubmit)}>
            <span className="formTitle">Login</span>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" 
                           ref={register}
                           required
                           name="email"/>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" 
                           ref={register}
                           required
                           minLength={6}
                           name="password"/>
                </div>
                <button>Log in</button>
            </form>
        </div>
    )
}

export default LoginPage
