import React from 'react'
import { connect } from 'react-redux'
import { userLogin } from '../reducers/userReducer'
import { useField } from '../hooks'
import { TextField, Button } from '@material-ui/core'

const LoginForm = (props) => {
  const username = useField('')
  const password = useField('')

  const handleLogin = async event => {
    event.preventDefault()
    props.userLogin(username, password)
    console.log('logging in with', username, password)

  }
  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        <TextField
          id='username'
          label='username'
          {...username}
        />
      </div>
      <div>
        <TextField
          id='password'
          label='password'
          type='password'
          value={password.value}
          onChange={password.onChange}
        />
      </div>
      <Button variant="contained" type='submit'>
        login
      </Button>
    </form>
  )
}

const mapDispatchToProps = {
  userLogin
}

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm