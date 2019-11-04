import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [titleClicked, setTitleClicked] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const handleBlogClick = () => {
    setTitleClicked(!titleClicked)
    console.log(titleClicked)
  }

  const handleLikeButtonClick = (blog) => {
    const updatedBlog = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      user: blog.user,
      likes: blogLikes + 1,
      id: blog.id
    }
    setBlogLikes(blogLikes + 1)
    blogService.update(updatedBlog)
  }

  const blogInfoStyle = {
    border: "1px solid black",
    padding: "5px",
    margin: "10px",
    borderRadius: "5px"
  }

  const BlogFullInfo = () => {
    return (
      <div style={blogInfoStyle}>
        <p>
          <span onClick={handleBlogClick}>{blog.title}</span> by {blog.author}
          <br />
          {blog.url}
          <br />
          {blogLikes} likes <button onClick={() => handleLikeButtonClick(blog)}>like</button>
          <br />
          added by {blog.user.name}
        </p>
      </div>
    )
  }
  const BlogLessInfo = () => {
    return (
      <div style={blogInfoStyle}>
        <p onClick={handleBlogClick}>
          {blog.title} by {blog.author}
        </p>
      </div>
    )
  }
  return (
    <div>
      {titleClicked ? <BlogFullInfo /> : <BlogLessInfo />}
    </div>
  )
}

export default Blog