import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,  waitForElement, cleanup } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

afterEach(cleanup)

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getAllByText('login')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  test('renders all blogs when logged in', async () => {
    const user = {
      username: 'joonas',
      token: 'eyJhbGciOiJIUzI1NiIsInR5',
      name: 'Joonas Kinnunen'
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)
    expect(component.container).toHaveTextContent('Life in Duckburg by Donald Duck')
    expect(component.container).toHaveTextContent('Some blog by Winnie the Pooh')
    expect(component.container).toHaveTextContent('Some other blog by Donald Duck')
  })
})
