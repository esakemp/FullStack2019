const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response, next) => {

    if (request.body.likes === null) {
        const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: 0

        })

        try {
            const savedBlog = await blog.save()
            response.json(savedBlog.toJSON())
        } catch (exception) {
            next(exception)
        }

    } else {
        const blog = new Blog(request.body)

        try {
            const savedBlog = await blog.save()
            response.json(savedBlog.toJSON())
        } catch (exception) {
            next(exception)
        }
    }

})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }

})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes,
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog.toJSON())
        })
        .catch(error => next(error))
})

module.exports = blogsRouter