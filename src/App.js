import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'
import { Blog, Blogs } from './components/Blog'
import Notification from './components/Notification'
import { User, Users } from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/blogUsersReducer'
import { logout, setLogin } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'

const App = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)

    useEffect(() => {
        let loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const userParsed = JSON.parse(loggedUserJSON)
            if (user === null) return
            dispatch(setLogin(userParsed))
        }
    }, [dispatch])

    const handleLogOut = () => {
        dispatch(logout())
    }

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    }, [dispatch])

    return (
        <Container>
            <Router>
                <div>
                    {user === null ?
                        <div>
                            <h2>Please log in</h2>
                            <LoginForm />
                        </div> :
                        <div>
                            <div>
                                <Link to='/'>Home</Link>
                                <Link to='/users'>Users</Link>
                                {`${user.username} logged in`} 
                                <Button variant="contained" onClick={handleLogOut}>
                                Log you out
                                </Button>
                            </div>

                            <div>
                                <h2>Blogs</h2>
                                <br></br>
                            </div>
                            <Notification message={notification} />

                            <Switch>
                                <Route path="/users/:id">
                                    <User users={users} />
                                </Route>
                                <Route path="/blogs/:id">
                                    <Blog blogs={blogs} user={user} />
                                </Route>
                                <Route path="/users">
                                    <Users />
                                </Route>
                                <Route path="/">
                                    <Blogs blogs={blogs} />
                                </Route>
                            </Switch>
                        </div>
                    }
                </div>

            </Router>
        </Container>
    )
}

export default App