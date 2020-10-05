import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '@material-ui/core/Container'
import {
    BrowserRouter as Router,
    Switch, Route
} from 'react-router-dom'
import { Blog, Blogs } from './components/Blog'
import Notification from './components/Notification'
import { User, Users } from './components/Users'
import LoginForm from './components/LoginForm'
import NavigationBar from './components/NavBar'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/blogUsersReducer'
import { setLogin } from './reducers/userReducer'

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
                            <Notification message={notification} />
                            <LoginForm />
                        </div> :
                        <div>
                            <NavigationBar />
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