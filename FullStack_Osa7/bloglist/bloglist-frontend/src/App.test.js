import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('renders only login form', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('login'))
    expect(component.container).not.toHaveTextContent('blogs')
  })

  it('renders blogs after login', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('blogs'))

    expect(component.container).toHaveTextContent('Teuvo Testaaja')
    expect(component.container).toHaveTextContent('React patterns')
    expect(component.container).toHaveTextContent('Canonical string reduction')
    expect(component.container).toHaveTextContent('Type Wars')
  })
})
