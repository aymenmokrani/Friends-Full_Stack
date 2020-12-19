import React, { useEffect, useState } from 'react'
import './friendsPage.scss'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useHistory } from 'react-router-dom'
import { useDataLayerValue } from '../../utils/DataLayer'



function FriendsPage() {
    
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState()
    const [friends, setFriends] = useState([])

    const history = useHistory()
    const cookies = new Cookies()
    const token = cookies.get('token')


    

    useEffect(() => {

        
        let isActive = true
    // check auth and get current user infos
    if (token) {
        axios.post('api/user', {token}).then(response => {
            const results = response.data
            if (results.isAuth) {
                if (isActive) {
                    
                    // const name = results.user.email.split('@')[0]
                    setUsername(results.user.email)
                    setFriends(results.user.friends)
                    getallUsers()
                }
            } else {
                history.push('/login')
            }
        })
    } else {
        history.push('/login')
    }

        return () => {
            isActive = false
        }
    }, [])




    // Add a friend to current user
    const addFriend = async ({_id, email}) => {
           
        try {
            const friend = { id: _id, email }
            const response = await axios.post('api/addfriend', {token, friend})
            if (response.data !== "" ) {
                setFriends([...friends, friend])
            }            
            
        } catch(error) {
            console.log(error.response);
        }
        
    }

    // Remove a friend form current user friends

    const removeFriend = async ({id: _id, email}) => {
        try {
            const friend = {id: _id, email}
            const response = await axios.post('api/removeFriend', {token, friend})
            if (response.dat !== "") {
                const removedFriend = friends.filter(e => (e.email !== friend.email))
                setFriends(removedFriend)
            }

        } catch(error) {
            console.log(error.response)
        }
    }
    
    
    // Get Users List

    const getallUsers = async () => {
        try {
            const users = await axios.get('api/allusers')
            setUsers(users.data)
        } catch(error) {
            return error.response
        }
    }


    
    


    return (
        <div className="friendsPage">
            <h1>Welcome {username}</h1>
            <div className="container">
                <div className="users">
                    <h3>Users</h3>
                    <div className="usersList">
                        {
                            users.map((item, idx) => (
                                item.email !== username &&
                                <span key={idx}
                                      className={
                                          friends.map(fr => fr.email).includes(item.email) ? 
                                          "disabled" : ""
                                        }
                                      onClick={() => addFriend(item)}
                                      >
                                    {item.email}</span>
                            ))
                        }
                    </div>
                </div>
                <div className="divider"></div>
                <div className="friends">
                    <h3>Friends</h3>
                    <div className="usersList">
                    {
                            friends.map((item, idx) => (
                                <span key={idx}
                                      onClick={() => removeFriend(item)}
                                      >
                                    {item.email}
                                </span>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendsPage
