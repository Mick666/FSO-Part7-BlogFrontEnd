import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'ADD_LIKE':
        return state.map((blog, i) => i === state.indexOf(action.data) ? action.data : blog)
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
        dispatch(setNotification(notificationMessage, 'green', 5))
        dispatch({
            type: 'NEW_BLOG',
            data: {
                ...newBlog
            }
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addLike = (content) => {
    console.log(content)
    return async dispatch => {
        const updatedBlog = await blogService.increaseLikes(content)
        console.log(updatedBlog)
        dispatch({
            type: 'ADD_LIKE',
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