import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { initializeBlogs, createBlog, addLike, removeBlog } from './reducers/blogReducer'
import { loginUser, logout, setLogin } from './reducers/userReducer'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)


    const blogFormRef = React.createRef()

    useEffect(() => {
        let loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const userParsed = JSON.parse(loggedUserJSON)
            if (user === null) return
            dispatch(setLogin(userParsed))
        }
    }, [dispatch])

    const handleLogin = async (username, password) => {
        dispatch(loginUser(username, password))
    }

    const handleLogOut = () => {
        dispatch(logout())
    }

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        dispatch(createBlog(blogObject))
    }

    const removePost = (event) => {
        console.log(event.target.dataset.id)
        dispatch(removeBlog(event.target.dataset.id))
    }


    const loginForm = () => {
        return (
            <Togglable buttonLabel='login'>
                <LoginForm
                    handleSubmit={handleLogin}
                />
            </Togglable>
        )
    }

    const blogForm = () => (
        <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )


    const increaseLikes = (blog) => {
        console.log(blog)
        let updatedBlog = blog
        updatedBlog.likes = +updatedBlog.likes + 1
        dispatch(addLike(updatedBlog))
    }

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    return (
        <div>
            <Notification message={notification}/>
            {user === null ?
                <div>
                    <h2>Please log in</h2>
                    {loginForm()}
                </div>:
                <div>
                    <h2>Blogs</h2>
                    {`${user.username} logged in`} <button onClick={handleLogOut}>Log you out</button>
                    <br></br>
                    <h2>Create new blog</h2>
                    {blogForm()}
                    <br></br>
                    {blogs.map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            user={user}
                            removePost={removePost}
                            increaseLikes={increaseLikes}/>
                    )}
                </div>
            }
        </div>
    )
}

export default App