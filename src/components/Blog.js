import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [titleClicked, setTitleClicked] = useState(false)
  console.log(blog.user)

  const handleBlogClick = () => {
    setTitleClicked(!titleClicked)
    console.log(titleClicked)
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
          {blog.likes} likes <button>like</button>
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