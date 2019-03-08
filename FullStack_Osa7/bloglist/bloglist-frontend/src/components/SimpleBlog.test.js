import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
import Blog from './Blog'

test('renders blog', () => {
  const blog = {
    author: 'Author',
    title: 'Title',
    url: 'testUrl',
    likes: 5
  }

  const mockHandler = jest.fn()

  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  expect(component.container).toHaveTextContent(
    'Title Authorblog has 5 likes like'
  )
})

test('clicking actually calls function', () => {
  const blog = {
    author: 'Author',
    title: 'Title',
    url: 'testUrl'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  const button = getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})

test('blogs only render title and author', () => {
  const name = 'String'

  const blog = {
    author: 'Author',
    title: 'Title',
    url: 'testUrl',
    user: {
      name: 'testName'
    }
  }

  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} updateBlogs={mockHandler} name={name} />
  )

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})

test('clicking blog renders more info', () => {
  const name = 'String'

  const blog = {
    author: 'Author',
    title: 'Title',
    url: 'testUrl',
    user: {
      name: 'testName'
    }
  }

  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} updateBlogs={mockHandler} name={name} />
  )

  const button = component.getByText('Title Author')
  fireEvent.click(button)

  const div = component.container.querySelector('.togglableContent')
  expect(div).not.toHaveStyle('display: none')
})
