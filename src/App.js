import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'
import { Blog, BlogHeader } from './components/Blog'
import Notification from './components/Notification'
import { User, Users } from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/blogUsersReducer'
import { logout, setLogin } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'

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
                            {`${user.username} logged in`} <button onClick={handleLogOut}>Log you out</button>
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
                                <div>
                                    <div>
                                        <h2>Create new blog</h2>
                                        <BlogForm />
                                        <br></br>
                                        {blogs.map(blog =>
                                            <BlogHeader
                                                key={blog.id}
                                                title={blog.title}
                                                author={blog.author}
                                                id={blog.id}
                                            />
                                        )}
                                    </div>
                                </div>
                            </Route>
                        </Switch>
                    </div>
                }
            </div>

        </Router>
    )
}

export default App