import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import Togglable from './Togglable'
import { TextField, Button } from '@material-ui/core'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        console.log(username, password)
        dispatch(loginUser(username, password))
        setUsername('')
        setPassword('')
    }

    return (
        <Togglable buttonLabel='login'>
            <div>
                <h2>Login</h2>

                <form onSubmit={onSubmit}>

                    <div>
                        <TextField label="username" value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        <TextField label="password" value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            type="password"
                        />
                    </div>
                    <Button variant="contained" color="primary" type="submit">
                    Login
                    </Button>
                </form>
            </div>
        </Togglable>
    )
}


export default LoginForm