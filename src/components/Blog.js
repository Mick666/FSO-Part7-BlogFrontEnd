import React, { useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addComment, addLike, removeBlog } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@material-ui/core'


const BlogHeader = ({ title, author, id }) => {
    return (
        <div>
            <Link to={`/blogs/${id}`}>
                {title} by {author}
            </Link>
        </div>
    )
}

const Blogs = ({ blogs }) => {
    return (
        <div>
            <h2>Create new blog</h2>
            <BlogForm />
            <br></br>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {blogs.map(blog =>
                            <TableRow key={blog.id}>
                                <TableCell>
                                    <BlogHeader
                                        title={blog.title}
                                        author={blog.author}
                                        id={blog.id}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const Blog = ({ blogs, user }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const blogId = useParams().id
    const blog = blogs.find(n => n.id.toString() === blogId.toString())
    const [comment, setComment] = useState('')

    if (!blog) return null


    const increaseLikes = (blog) => {
        let updatedBlog = blog
        updatedBlog.likes = +updatedBlog.likes + 1
        updatedBlog.user = updatedBlog.user.id ? updatedBlog.user.id : updatedBlog.user
        dispatch(addLike(updatedBlog))
    }


    const removePost = (event) => {
        dispatch(removeBlog(event.target.dataset.id))
        history.push('/')
    }

    const addBlogComment = (event, blog, comment) => {
        event.preventDefault()
        const updatedBlog = {
            ...blog,
            comments: blog.comments.concat(comment),
            user: blog.user && blog.user.id ? blog.user.id : blog.user
        }
        dispatch(addComment(updatedBlog, comment))
        setComment('')
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
                {user && (user.username === blog.user.username) ?
                    <button onClick={removePost} data-id={blog.id}>Remove</button> : <div></div>}
                <h3>Comments</h3>
                <ul>
                    {blog.comments.map((comment, index) =>
                        <li key={index}>{comment}</li>
                    )}
                </ul>
                <form onSubmit={(event) => addBlogComment(event, blog, comment)}>
                    Add a comment:
                    <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button type="submit">Post</button>
                </form>
            </div>
        </div>
    )
}

export { Blog, Blogs }