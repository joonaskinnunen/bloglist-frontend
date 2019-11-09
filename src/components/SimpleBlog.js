import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      <span className='title'>{blog.title}</span> <span className='author'>{blog.author}</span>
    </div>
    <div>
      blog has <span className='likes'>{blog.likes} likes</span>
      <button onClick={onClick} className='likeBtn'>like</button>
    </div>
  </div>
)

export default SimpleBlog