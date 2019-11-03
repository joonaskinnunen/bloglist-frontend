import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogUrl, setNewBlogUrl] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogFormVisible, setblogFormVisible] = useState(false)


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
  const handleNewBlog = (event) => {
    event.preventDefault()
    const newObject = {
      title: newBlogTitle,
      url: newBlogUrl,
      author: newBlogAuthor
    }
    blogService.create(newObject)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        setNotificationMessage(`A new blog ${newBlogTitle} by ${newBlogAuthor} added`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 4000)
        setNewBlogAuthor("")
        setNewBlogTitle("")
        setNewBlogUrl("")
      })
      .catch(e => {
        setErrorMessage("Error: fill in all fields")
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
  }
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            password={password}
            username={username}
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}

          />
        </div>
      </div>
    )
  }

  const blogsForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setblogFormVisible(true)}>New blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogsForm
            handleNewBlog={handleNewBlog}
            newBlogTitle={newBlogTitle}
            newBlogAuthor={newBlogAuthor}
            newBlogUrl={newBlogUrl}
            setNewBlogTitle={setNewBlogTitle}
            setNewBlogAuthor={setNewBlogAuthor}
            setNewBlogUrl={setNewBlogUrl}
          />
          <button onClick={() => setblogFormVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }



  const blogsListing = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  const ErrorMessage = ({ message }) => {
    const errorMessageStyle = {
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
      <div style={errorMessageStyle}>
        {message}
      </div>
    )
  }
  const Notification = ({ message }) => {
    const notificationStyle = {
      border: "2px solid green",
      color: "green",
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
        <Notification message={notificationMessage} />
      </header>
      {user ? <div> <p>{user.name} logged in<button onClick={handleLogOut}>log out</button></p>{blogsForm()} <br /> {blogsListing()} </div> : loginForm()}
    </div>
  )
}

export default App;
