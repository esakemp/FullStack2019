import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

    switch (action.type) {
        case 'INIT_BLOGS':
            return state
        case 'CREATE':
            const newBlog = action.data
            return [...state, newBlog]
        default: state
    }

}

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)

        dispatch({
            type: 'CREATE',
            data: newBlog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        await dispatch({
            type: 'INIT_BLOGS',
            data: null
        })
    }
}

export default blogReducer