import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, likeBlog, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { Paper, TextField, Button } from '@material-ui/core'


const Blog = (props) => {
  const comment = useField('')

  const handleLike = event => {
    event.preventDefault()
    props.blog.likes = props.blog.likes + 1
    props.likeBlog(props.blog)
  }
  const handleDelete = event => {
    event.preventDefault()
    if (window.confirm(`do you really want to delete ${props.blog.title}`)) {
      props.deleteBlog(props.blog)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    const newComment = {
      comment: comment.value,
      id: props.blog.id
    }
    props.addComment(newComment, props.blog.id)
    comment.onReset()
  }

  if (props.blog === undefined) {
    return null
  }

  return (
    <Paper>
      <div>
        {props.blog.title} {props.blog.author}
      </div>
      <div>
        <div>{props.blog.url}</div>
        <div>
          likes: {props.blog.likes} <Button onClick={handleLike}>like</Button>
        </div>
        <div>added by: {props.blog.user.name}</div>
        <div>
          {props.name !== props.blog.user.name ? (
            <div />
          ) : (<Button onClick={handleDelete}>delete</Button>)}
        </div>
        <div>
          <h3>comments</h3>
          <div>
            <form onSubmit={handleSubmit}>
              <TextField id='comment' {...comment} label='comment' />
              <Button color='primary' type='submit'>add comment</Button>
            </form>
          </div>
          <div>
            <ul>
              {props.blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </Paper>
  )
}


const mapDispatchToProps = {
  deleteBlog,
  likeBlog,
  addComment
}

const ConnectedBlogs = connect(null, mapDispatchToProps)(Blog)

export default ConnectedBlogs
