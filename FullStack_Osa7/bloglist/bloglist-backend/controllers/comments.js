const router = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

router.get('/:id/comments', async (request, response) => {

    const comments = await Comment.find({})

    response.json(comments.map(b => b.toJSON()))
})

router.post('/:id/comments', async (request, response) => {
    const comment = new Comment(request.body)

    const blog = await Blog.findById(request.params.id)

    const result = await comment.save()
    blog.comments = blog.comments.concat(comment)
    console.log(blog)
    console.log(comment)
    await blog.save()
    response.status(201).json(result)
})

module.exports = router