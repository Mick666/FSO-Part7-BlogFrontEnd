import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const User = ({ users }) => {
    const userId = useParams().id
    const user = users.find(n => n.id.toString() === userId.toString())

    if (!user) {
        return null
    }


    return (
        <div>
            <h2>{user.username}</h2>
            <br />
            <h4>Added Blogs</h4>
            <ul>
                {user.blogs.map((blog, index) =>
                    <li key={index}>{blog.title}</li>
                )}
            </ul>
        </div>
    )
}



const Users = () => {
    const users = useSelector(state => state.users)
    console.log(users)
    return (
        <div className='userGridParent'>
            <span className='userGridItem'>
                <b>Users</b>
                <b>Blogs created:</b>
            </span>
            {users.map((user, index) =>
                <div className='userGridItem' key={index}>
                    <Link to={`/users/${user.id}`}>
                        <p>{user.username}</p>
                    </Link>
                    <p>{user.blogs.length}</p>
                </div>
            )}
        </div>
    )
}


export { Users, User }