import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import Togglable from './Togglable'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Togglable buttonLabel='login'>
            <div>
                <h2>Login</h2>

                <form onSubmit={(event) => {
                    event.preventDefault()
                    dispatch(loginUser(username, password))
                    setUsername('')
                    setPassword('')
                }}>

                    <div>
                        username
                        <input
                            id='username'
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            id='password'
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type='submit' id='loginButton'>login</button>
                </form>
            </div>
        </Togglable>
    )
}


export default LoginForm