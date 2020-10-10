import userService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userReducer = (state = [], action) => {
    switch (action.type) {
    case 'LOGIN':
        return action.data
    case 'LOGOUT':
        return null
    default:
        return state
    }
}

export const loginUser = (username, password) => {
    return async dispatch => {
        try {
            const loggedInUser = await userService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(loggedInUser)
            )
            blogService.setToken(loggedInUser.token)
            const notificationMessage = `${username} successfully logged in`
            dispatch(setNotification(notificationMessage, 'success', 5))
            dispatch({
                type: 'LOGIN',
                data: loggedInUser
            })
        } catch (error) {
            const notificationMessage = 'Wrong credentials'
            dispatch(setNotification(notificationMessage, 'error', 5))
        }
    }
}

export const setLogin = (user) => {
    return dispatch => {
        if (user === null) {
            logout()
            return
        } else {
            blogService.setToken(user.token)
            console.log(user)
            dispatch({
                type: 'LOGIN',
                data: user
            })
        }
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.setItem(
            'loggedBlogappUser', null
        )

        dispatch({
            type: 'LOGOUT',
            data: null
        })
    }
}

export default userReducer
