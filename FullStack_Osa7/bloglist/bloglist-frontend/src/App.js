import React, { useEffect, useState } from 'react'
import userService from './services/users'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { userLogin, userLogout, initializeUser } from './reducers/userReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const App = (props) => {
  const username = useField('')
  const password = useField('')

  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAll().then(user => { setUsers(user) })
  }, [])

  useEffect(() => {
    props.initializeBlogs()
  }, [])
  useEffect(() => {
    props.initializeUser()
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    props.userLogin(username, password)
    console.log('logging in with', username, password)
  }
  const handleLogout = event => {
    event.preventDefault()
    props.userLogout()
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

  const BlogForm = () => (
    <div>
      <Togglable buttonLabel="new blog">
        <CreateForm />
      </Togglable>
    </div>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const BlogList = () => (
    <div>
      <div>
        <BlogForm />
        <h2>list of current blogs</h2>
        {props.blogs.map(blog => <ul style={blogStyle} key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></ul>
        )}
      </div>
    </div>
  )

  const UserList = ({ users }) => {

    return (
      <div>
        <Table>
          <h2>users</h2>
          <tbody>
            {users.map(user => <tr key={user.id} >
              <td>
                <Link to={`/users/${user.id}`}>{user.name}
                </Link></td>
              <td>
                {user.blogs.length}
              </td>
            </tr>)}
          </tbody>
        </Table>
      </div>
    )
  }
  const User = ({ user }) => {
    if (user === undefined) {
      return null
    }
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </div>
    )
  }

  const userById = (id) => users.find(a => a.id === id)

  const blogById = (id) => props.blogs.find(a => a.id === id)

  const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {props.user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }

  return (
    <div className='container'>
      <Notification />
      {props.user === null ? (
        loginForm()
      ) : (
          <div>
            <Router>
              <div>
                <h4>blog app</h4>
                <Menu />
                <Route exact path='/' render={() => <div><BlogList /></div>} />
                <Route exact path='/users' render={() => <UserList users={users} />} />
                <Route exact path='/users/:id' render={({ match }) => <User user={userById(match.params.id)} />} />
                <Route exact path='/blogs/:id' render={({ match }) => <Blog blog={blogById(match.params.id)} name={props.user.name} />} />
              </div>
            </Router>

          </div>
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  initializeUser,
  userLogin,
  userLogout
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp