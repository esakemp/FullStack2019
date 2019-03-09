import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, likeBlog, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks'

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
    <div>
      <div>
        {props.blog.title} {props.blog.author}
      </div>
      <div>
        <div>{props.blog.url}</div>
        <div>
          likes: {props.blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>added by: {props.blog.user.name}</div>
        <div>
          {props.name !== props.blog.user.name ? (
            <div />
          ) : (
              <button onClick={handleDelete}>delete</button>
            )}
        </div>
        <div>
          <h3>comments</h3>
          <div>
            <form onSubmit={handleSubmit}>
              <input type='text' value={comment.value} onChange={comment.onChange} />
              <button type='submit'>add comment</button>
            </form>
          </div>
          <div>
            {props.blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}

          </div>
        </div>
      </div>
    </div>
  )
}


const mapDispatchToProps = {
  deleteBlog,
  likeBlog,
  addComment
}

const ConnectedBlogs = connect(null, mapDispatchToProps)(Blog)

export default ConnectedBlogs
