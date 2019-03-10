import React from 'react'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core/'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { hide } from '../reducers/visibilityReducer'

const CreateForm = (props) => {
  const author = useField('')
  const title = useField('')
  const url = useField('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event)
    const newBlogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      user: props.user.id
    }
    title.onReset()
    author.onReset()
    url.onReset()
    props.hide()
    props.createBlog(newBlogObject)
  }
  return (
    <div>
      <h2>add new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id='title'
            label='title'
            {...title}
          />
        </div>
        <div>
          <TextField
            id='author'
            label='author'
            {...author}
          />
        </div>
        <div>
          <TextField
            id='url'
            label='url'
            {...url}
          />
        </div>
        <Button type="submit">create</Button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  createBlog,
  hide
}

const ConnectedCreateForm = connect(mapStateToProps, mapDispatchToProps)(CreateForm)

export default ConnectedCreateForm
