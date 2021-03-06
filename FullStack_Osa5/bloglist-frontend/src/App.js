import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [user, setUser] = useState(null)
  const username = useField('')
  const password = useField('')
  const author = useField('')
  const title = useField('')
  const url = useField('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(
        blogs.sort(function(a, b) {
          return b.likes - a.likes
        })
      )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs(
        blogs.sort(function(a, b) {
          return b.likes - a.likes
        })
      )
    )
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      username.onReset()
      password.onReset()
    } catch (exception) {
      setMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }
  const handleLogout = event => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleSubmit = event => {
    event.preventDefault()
    const newBlogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
      user: user.id
    }
    blogService.create(newBlogObject).then(response => {
      console.log(response.data)
      updateBlogs()
      title.onReset()
      author.onReset()
      url.onReset()
      setMessage('Blog was successfully created')
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    })
  }

  const loginForm = () => (
    <div>
      <LoginForm
        password={password}
        username={username}
        handleLogin={handleLogin}
      />
    </div>
  )

  const blogForm = () => (
    <div>
      <Togglable buttonLabel="new blog">
        <CreateForm
          author={author.value}
          title={title.value}
          url={url.value}
          handleSubmit={handleSubmit}
          handleAuthorChange={author.onChange}
          handleTitleChange={title.onChange}
          handleUrlChange={url.onChange}
        />
      </Togglable>
    </div>
  )

  const blogList = () => (
    <div>
      <div>
        <h2>list of current blogs</h2>
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlogs={updateBlogs}
            name={user.name}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div>
      <Notification message={message} messageType={messageType} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
