import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({username, password, handleLogin}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          {...username}
        />
      </div>
      <div>
        password
        <input
          {...password}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired,
    handleLogin: PropTypes.func.isRequired
}

export default LoginForm