import React from 'react'
import { useHistory } from 'react-router-dom'
import './signupPage.scss'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Cookies from 'universal-cookie'

function SignupPage() {

    const cookies = new Cookies()

    const { register, handleSubmit} = useForm()
    const history = useHistory()

    const onSubmit = async data => {
        try{
            const result = await axios.post('api/signup', data)
            const token = result.data.token;
            cookies.set('token', token)
            history.push('/friends')
        }
        catch(err) {
            console.log(err.response.data);
        }
        
    }

    return (
        <div className="signupPage">
            <form onSubmit={handleSubmit(onSubmit)}>
            <span className="formTitle">Sign up</span>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" 
                           required
                           ref={register}
                           name="email"/>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" 
                           required
                           minLength={6}
                           ref={register}
                           name="password"/>
                </div>
                <button>Sign up</button>
            </form>
        </div>
    )
}

export default SignupPage
