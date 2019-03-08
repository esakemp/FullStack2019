import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ name, blog, updateBlogs }) => {
  const [visible, setVisibility] = useState(false)
  const [currentBlog, setBlog] = useState(blog)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = event => {
    event.preventDefault()
    setVisibility(!visible)
  }
  const handleLike = event => {
    event.preventDefault()
    blog.likes = blog.likes + 1

    blogService.update(blog).then(response => console.log(response.data))
    setBlog(blog)
  }
  const handleDelete = event => {
    event.preventDefault()
    if (window.confirm(`do you really want to delete ${currentBlog.title}`)) {
      blogService.remove(blog).then(response => {
        console.log(response.data)
        updateBlogs()
      })
    }
  }

  return (
    <div style={blogStyle}>
      <div onClick={handleClick}>
        {currentBlog.title} {currentBlog.author}
      </div>
      <div style={showWhenVisible} className={'togglableContent'}>
        <div>{currentBlog.url}</div>
        <div>
          likes: {currentBlog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>added by: {currentBlog.user.name}</div>
        <div>
          {name !== currentBlog.user.name ? (
            <div />
          ) : (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
