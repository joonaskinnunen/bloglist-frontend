import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

describe('<Blog />', () => {
  let component
  let blogs
  let blog

  beforeEach(() => {
    const user = {
      name: 'Joe Average',
      username: 'joeaverage'
    }

    blogs = [{
      title: 'Life in Duckburg',
      author: 'Donald Duck',
      url: 'http://blogsaddress.com',
      likes: 4,
      user: user
    }]

    blog = blogs[0]

    component = render(
      <Blog blog={blog} blogs={blogs} user={user} setBlogs={() => {}} />
    )
  })
  test('renders only title and author', () => {
    expect(component.container).toHaveTextContent(`${blog.title} by ${blog.author}`)
    expect(component.container).not.toHaveTextContent(`${blog.likes} likes`)
    expect(component.container).not.toHaveTextContent(`${blog.url}`)
    expect(component.container).not.toHaveTextContent(`added by ${blog.user.name}`)
  })

  test('renders url, likes and users name when title clicked', () => {
    const clickableTitle = component.container.querySelector('p')
    fireEvent.click(clickableTitle)
    expect(component.container).toHaveTextContent(`${blog.title} by ${blog.author}`)
    expect(component.container).toHaveTextContent(`${blog.likes} likes`)
    expect(component.container).toHaveTextContent(`${blog.url}`)
    expect(component.container).toHaveTextContent(`added by ${blog.user.name}`)
  })

})