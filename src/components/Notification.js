import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (notification === null) return null
    return (
        <Alert severity={notification.style}>
            {notification.content}
        </Alert>
    )
}

export default Notification