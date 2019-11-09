import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

describe('<SimpleBlog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Best Blog',
      author: 'Donald Duck',
      likes: 4
    }

    const handleClick = () => {
      console.log('clicked')
    }

    component = render(
      <SimpleBlog blog={blog} onClick={handleClick} />
    )
  })
  test('renders title', () => {
    expect(component.container).toHaveTextContent('Best Blog')
  })
  test('renders author', () => {
    expect(component.container).toHaveTextContent('Donald Duck')
  })
  test('renders likes', () => {
    expect(component.container).toHaveTextContent('blog has 4 likes')
  })
  test('clicking the button twice calls event handler twice', () => {
    const blog = {
      title: 'Best Blog',
      author: 'Donald Duck',
      likes: 4
    }
    const mockHandler = jest.fn()

    const renderedBlog = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = renderedBlog.container.querySelector('button')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
