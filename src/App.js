import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogUrl, setNewBlogUrl] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")

  useEffect(() => {
    blogService
      .getAll().then(blogs => {
        setBlogs(blogs)
      })
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (e) {
      setErrorMessage("wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }
  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newObject = {
      title: newBlogTitle,
      url: newBlogUrl,
      author: newBlogAuthor
    }
    blogService.create(newObject)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        setNewBlogAuthor("")
        setNewBlogTitle("")
        setNewBlogUrl("")
      })
  }
  const loginForm = () => (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          <span>username </span>
          <input type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <span>password </span>
          <input type="text" name="Password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>

  )

  const newBlog = () => (
    <div>
      <h2>
        add new blog
      </h2>
      <form onSubmit={handleNewBlog}>
        title <input type="text" name="Title" value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} /><br />
        author <input type="text" name="Author" value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} /><br />
        url <input type="text" name="Url" value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} /><br />
        <button type="submit">add</button>
      </form>
    </div>

  )


  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }



  const blogsForm = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  const ErrorMessage = ({ message }) => {
    const notificationStyle = {
      border: "2px solid red",
      color: "red",
      backgroundColor: "#d3d3d3",
      padding: "10px",
      borderRadius: "5px",
      display: "inline-block",
      fontWeight: "bold"
    }
    if (message === null) {
      return null
    }
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bloglist</h1>
        <ErrorMessage message={errorMessage} />
      </header>
      {user ? <div> <p>{user.name} logged in</p><button onClick={handleLogOut}>log out</button>{blogsForm()} <br /> {newBlog()} </div> : loginForm()}
    </div>
  )
}

export default App;
