import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'


const BlogHeader = ({ title, author, id }) => {
    return (
        <div  className='blogStyle'>
            <Link to={`/blogs/${id}`}>
                {title} by {author}
            </Link>
        </div>
    )
}

const Blog = ({ blogs, user }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const blogId = useParams().id
    const blog = blogs.find(n => n.id.toString() === blogId.toString())

    if (!blog) return null


    const increaseLikes = (blog) => {
        let updatedBlog = blog
        updatedBlog.likes = +updatedBlog.likes + 1
        dispatch(addLike(updatedBlog))
    }


    const removePost = (event) => {
        dispatch(removeBlog(event.target.dataset.id))
        history.push('/')
    }


    return (
        <div>
            <div>
                <h2>{blog.title}</h2>
                    Url: {blog.url}
                <br />
                    Likes: {blog.likes}  <button onClick={() => increaseLikes(blog)}>Like</button>
                <br />
                    Author: {blog.author}
                <br />
                {user && (user.username === blog.user.username || blog.user === 'NewlyCreatedBlog') ?
                    <button onClick={removePost} data-id={blog.id}>Remove</button> : <div></div>}
            </div>
        </div>
    )
}

export { Blog, BlogHeader }