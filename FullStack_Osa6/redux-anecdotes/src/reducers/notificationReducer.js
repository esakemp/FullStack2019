const notificationReducer = (state = null, action) => {

    switch (action.type) {
        case 'SET_NOTIFICATION':
            state = action.data
            return state
        default: return state
    }
}
export const setNotification = (notification, timeout) => {
    return async dispatch => {
        await dispatch({
            type: 'SET_NOTIFICATION',
            data: notification
        })
        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: null
            })
        }, timeout * 1000)
    }
}

export default notificationReducer