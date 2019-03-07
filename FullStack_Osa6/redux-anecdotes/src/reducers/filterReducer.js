const filterReducer = (state = '', action) => {

    switch (action.type) {
        case 'CHANGE_FILTER':
            state = action.filter
            return state
        default: return state
    }


}

export const changeFilter = filter => {
    return {
        type: 'CHANGE_FILTER',
        filter: filter
    }
}

export default filterReducer