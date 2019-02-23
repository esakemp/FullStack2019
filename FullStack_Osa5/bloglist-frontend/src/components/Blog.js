import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisibility] = useState(false)

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
  const handleLike = async event => {
    event.preventDefault()
    blog.likes = blog.likes + 1

    const response = await blogService.update(blog)
    return console.log(response.data)
    
  }

  return (
    <div style={blogStyle}>
      <div onClick={handleClick}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>added by: {blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
