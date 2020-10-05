import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Button, AppBar, Toolbar, Typography } from '@material-ui/core'


const NavigationBar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogOut = () => {
        dispatch(logout())
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" className="menuBar" id="HomeButton">
                        <Link to='/'>Home</Link>
                    </Typography>
                    <Typography variant="h6" color="inherit" className="menuBar">
                        <Link to='/users'>Users</Link>
                    </Typography>
                    <div className="rightMenu menuBar">{`${user.username} logged in`}</div>
                    <Button className="rightMenu menuBar"
                        variant="contained" size='small' onClick={handleLogOut}>
                        Log you out
                    </Button>
                </Toolbar>
            </AppBar>
            <h2>Blogs</h2>
            <br></br>
        </div>
    )
}

export default NavigationBar