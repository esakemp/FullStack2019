import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

TextTrackList('renders blog', () => {
  var clicks = 0
  const blog = {
    author: 'Author',
    title: 'Title',
    url: 'testUrl'
  }
  const onClick = () => {
    click += 1
  }

  const component = render(<SimpleBlog blog={blog} onClick={onClick} />)
  expect(component.container).toHaveTextContent(
      'Author Title'
  )
})
