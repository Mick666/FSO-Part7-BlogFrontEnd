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
    TextField,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FavoriteIcon from '@material-ui/icons/Favorite'

const useStyles = makeStyles({
    inputField: {
        marginLeft: '10px',
    },
    inputButton: {
        marginLeft: '10px',
        position: 'relative',
        top: '17px'
    },
})


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
    const classes = useStyles()

    if (!blog) return null


    const increaseLikes = (blog) => {
        let updatedBlog = blog
        updatedBlog.likes = +updatedBlog.likes + 1
        updatedBlog.user = updatedBlog.user.id ? updatedBlog.user.id : updatedBlog.user
        dispatch(addLike(updatedBlog))
    }


    const removePost = (id) => {
        dispatch(removeBlog(id))
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
                <List component="nav">
                    <ListItem>
                        <ListItemText primary={`Url: ${blog.url}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Likes: ${blog.likes}`} />
                        <ListItemIcon>
                            <FavoriteIcon onClick={() => increaseLikes(blog)} />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Author: ${blog.author}`} />
                    </ListItem>
                    {user && (user.username === blog.user.username) ?
                        <ListItem>
                            <ListItemIcon>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={() => removePost(blog.id)}
                                    data-id={blog.id}
                                >
                                    Remove
                                </Button>
                            </ListItemIcon>
                        </ListItem> : <div></div>}
                </List>

                <h3>Comments</h3>
                <ul>
                    {blog.comments.map((comment, index) =>
                        <li key={index}>{comment}</li>
                    )}
                </ul>
                <form onSubmit={(event) => addBlogComment(event, blog, comment)}>
                    <TextField label="comment" value={comment} className={classes.inputField}
                        onChange={({ target }) => setComment(target.value)}
                    />
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.inputButton}>
                        Post
                    </Button>
                </form>
            </div>
        </div>
    )
}

export { Blog, Blogs }