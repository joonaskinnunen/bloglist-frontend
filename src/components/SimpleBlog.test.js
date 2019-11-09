import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
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
})
