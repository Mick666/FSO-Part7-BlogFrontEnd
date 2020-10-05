import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { initializeUsers } from './blogUsersReducer'

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'UPDATE_BLOG':
        const id = action.data.id
        return state.map(blog => blog.id !== id ? blog : action.data)
    case 'NEW_BLOG':
        return [ ...state, action.data]
    case 'INIT_BLOGS':
        return action.data
    case 'REMOVE_BLOG':
        return state.filter(blog => blog.id !== action.data)
    default:
        return state
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        const notificationMessage = `New blog ${content.title} by ${content.author} added`
        dispatch(setNotification(notificationMessage, 'success', 5))
        dispatch({
            type: 'NEW_BLOG',
            data: {
                ...newBlog,
                user: 'NewlyCreatedBlog'
            }
        })
        dispatch(initializeUsers())
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log(blogs)
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addLike = (content) => {
    return async dispatch => {
        const updatedBlog = await blogService.increaseLikes(content)
        dispatch({
            type: 'UPDATE_BLOG',
            data: updatedBlog
        })
    }
}


export const addComment = (blog) => {
    return async dispatch => {
        const updatedBlog = await blogService.addComment(blog)
        dispatch({
            type: 'UPDATE_BLOG',
            data: updatedBlog
        })
    }
}

export const removeBlog = (blogId) => {
    return async dispatch => {
        try {
            const deletedBlog = await blogService.deletePost(blogId)
        } catch (error) {
            console.log(error)
            return
        }
        dispatch({
            type: 'REMOVE_BLOG',
            data: blogId
        })
    }
}


export default blogReducer