import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (notification === null) return null
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        borderColor: notification.style
    }
    return (
        <div style={style}>
            {notification.content}
        </div>
    )
}

export default Notification