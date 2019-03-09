import React from 'react'
import { connect } from 'react-redux'
import { show, hide } from '../reducers/visibilityReducer'

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
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

const mapStateToProps =(state)=> {
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
