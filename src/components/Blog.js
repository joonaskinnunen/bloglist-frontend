import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [titleClicked, setTitleClicked] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes)
  const handleBlogClick = () => {
    setTitleClicked(!titleClicked)
    console.log(titleClicked)
  }

  const handleLikeButtonClick = blog => {
    const updatedBlog = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      user: blog.user,
      likes: blogLikes + 1,
      id: blog.id
    }
    blogService.update(updatedBlog)
      .then(() => {
        setBlogLikes(blogLikes + 1)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const handleRemoveButtonClick = blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id)
        .then(() => {
          console.log(blog.id)
          setBlogs(blogs.filter(x => x.id !== blog.id))
        })
    }
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
          <br />
          {user.username === blog.user.username ? <button onClick={() => handleRemoveButtonClick(blog)}>remove</button> : void 0}
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