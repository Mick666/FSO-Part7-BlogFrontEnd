import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from '@material-ui/core'

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
                <h3>Users</h3>
                <br />
                <b>Blogs created:</b>
            </span>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {users.map((user, index) =>
                            <TableRow key={index}>
                                <TableCell>
                                    {user.username}
                                </TableCell>
                                <TableCell>
                                    {user.blogs.length}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}


export { Users, User }