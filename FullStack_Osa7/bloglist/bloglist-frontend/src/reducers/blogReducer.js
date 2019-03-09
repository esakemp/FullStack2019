import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

    switch (action.type) {
        case 'INIT_BLOGS':
            return sortBlogs(action.data)
        case 'CREATE':
            const newBlog = action.data
            return [...state, newBlog]
        case 'DELETE':
            const newState = state.filter(item => item !== action.data)
            return sortBlogs(newState)
        case 'LIKE':
            const likedBlogIndex = findBlogIndex(state, action.data.id)
            state[likedBlogIndex].likes += 1
            sortBlogs(state)
            return [...state]
        case 'ADD_COMMENT':
            const commentedBlogIndex = findBlogIndex(state, action.data.blogId)
            state[commentedBlogIndex].comments = state[commentedBlogIndex].comments.concat(action.data.comment)
            return [...state]
        default: return sortBlogs(state)
    }

}

const findBlogIndex =(blogs, id) => {
    return blogs.findIndex(blog => blog.id === id)
}

const sortBlogs = (blogs) => {
    return blogs.sort(function (a, b) {
        return b.likes - a.likes
    })
}

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        const blogs = await blogService.getAll()

        dispatch({
            type: 'CREATE',
            data: newBlog
        })
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const deleteBlog = (content) => {
    return async dispatch => {

        await blogService.remove(content)

        dispatch({
            type: 'DELETE',
            data: content
        })
    }
}

export const likeBlog = (content) => {
    return async dispatch => {
        await blogService.update(content)
        const blogs = await blogService.getAll()

        dispatch({
            type: 'LIKE',
            data: content
        })
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addComment = (content, id) => {
    return async dispatch => {
        const newComment = await blogService.comment(content)

        const comment = {
            comment: newComment,
            blogId: id
        }

        dispatch({
            type: 'ADD_COMMENT',
            data: comment
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()

        await dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export default blogReducer