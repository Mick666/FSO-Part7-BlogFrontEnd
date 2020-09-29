import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    handleSubmit
}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    LoginForm.propTypes = {
        handleSubmit: PropTypes.func.isRequired,
    }
    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={(event) => {
                event.preventDefault()
                handleSubmit(username, password)
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
    )
}


export default LoginForm