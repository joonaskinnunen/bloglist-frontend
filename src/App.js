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
          <input type="text" name="Password" value={password} onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button type="submit">login</button>
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
      {user ? <div> <p>{user.name} logged in</p><button onClick={handleLogOut}>log out</button>{blogsForm()} </div> : loginForm()}
    </div>
  );
}

export default App;
