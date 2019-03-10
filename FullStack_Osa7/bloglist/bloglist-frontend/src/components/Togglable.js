import React from 'react'
import { connect } from 'react-redux'
import { show, hide } from '../reducers/visibilityReducer'
import { Button } from '@material-ui/core'

const Togglable = props => {

  const hideWhenVisible = { display: props.visibility ? 'none' : '' }
  const showWhenVisible = { display: props.visibility ? '' : 'none' }

  const toggleVisibility = () => {

    if(props.visibility) {
      props.hide()
    } else {
      props.show()
    }
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

const mapStateToProps =(state) => {
  return {
    visibility: state.visibility
  }
}

const mapDispatchToProps = {
  show,
  hide
}

const ConnectedTogglable = connect(mapStateToProps, mapDispatchToProps)(Togglable)

export default ConnectedTogglable
