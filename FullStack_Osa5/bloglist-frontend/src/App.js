import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
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
    blogFormRef.current.toggleVisibility()
    const newBlogObject = {
      title: title,
      author: author,
      url: url
    }
    blogService.create(newBlogObject).then(response => {
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage('Blog was successfully created')
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <div>
      <Togglable buttonLabel="new blog">
        <CreateForm
          author={author}
          title={title}
          url={url}
          handleSubmit={handleSubmit}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
        />
      </Togglable>
    </div>
  )

  const blogList = () => (
    <div>
      <div>
        <h2>list of current blogs</h2>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
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
