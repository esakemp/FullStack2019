const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const { tokenExtractor, errorHandler } = require('./utils/middleware')

const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const commentsRouter = require('./controllers/comments')

app.use(cors())
app.use(bodyParser.json())

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(tokenExtractor)

if (process.env.NODE_ENV === 'test') { 
  const testingRouter = require('./controllers/testing')  
  app.use('/api/testing', testingRouter) 
}

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', commentsRouter)

app.use(errorHandler)


module.exports = app