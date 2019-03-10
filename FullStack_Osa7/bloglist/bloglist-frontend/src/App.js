import React, { useEffect, useState } from 'react'
import userService from './services/users'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { userLogin, userLogout, initializeUser } from './reducers/userReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { Button, Paper } from '@material-ui/core'


const App = (props) => {

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

  const handleLogout = event => {
    event.preventDefault()
    props.userLogout()
  }

  const loginForm = () => (
    <div>
      <LoginForm />
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
        <Table>
          <tbody>
            {props.blogs.map(blog => <tr style={blogStyle} key={blog.id}><td>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}</Link></td></tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )

  const UserList = ({ users }) => {

    return (
      <div>
        <h2>list of users</h2>
        <Table>
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
      <Paper>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        {user.blogs.map(blog => <div key={blog.id}>{blog.title}</div>)}
      </Paper>
    )
  }

  const userById = (id) => users.find(a => a.id === id)

  const blogById = (id) => props.blogs.find(a => a.id === id)

  const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <Paper>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {props.user.name} logged in
        <Button onClick={handleLogout}>logout</Button>
      </Paper>
    )
  }

  return (
    <div className='container'>
      <Notification />
      {props.user === null ? (
        loginForm()
      ) : (<div>
        <Router>
          <Paper>
            <h4>blog app</h4>
            <Menu />
            <Route exact path='/' render={() => <div><BlogList /></div>} />
            <Route exact path='/users' render={() => <UserList users={users} />} />
            <Route exact path='/users/:id' render={({ match }) => <User user={userById(match.params.id)} />} />
            <Route exact path='/blogs/:id' render={({ match }) => <Blog blog={blogById(match.params.id)} name={props.user.name} />} />
          </Paper>
        </Router>

      </div>)}
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