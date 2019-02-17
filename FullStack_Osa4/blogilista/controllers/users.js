const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
        response.json(users.map(u => u.toJSON()))
    } catch (error) {
        next(error)
    }



})

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        if (body.password.length < 3) {
            return response.status(400).json({ message: 'password too short' })
        }

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter