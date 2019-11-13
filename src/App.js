import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const noteFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll().then(blogs => {
        setBlogs(blogs.sort((a, b) => {
          return b.likes - a.likes
        }))
      })
  }, [])

  const handleNewBlog = (event) => {
    event.preventDefault()
    noteFormRef.current.toggleVisibility()
    const newObject = {
      title: newBlogTitle,
      url: newBlogUrl,
      author: newBlogAuthor
    }
    blogService.create(newObject)
      .then(createdBlog => {
        console.log(createdBlog)
        blogService
          .getAll().then(blogs => {
            console.log(blogs)
            setBlogs(blogs.sort((a, b) => {
              return b.likes - a.likes
            }))
          })
        setNotificationMessage(`A new blog ${newBlogTitle} by ${newBlogAuthor} added`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 4000)
        setNewBlogAuthor('')
        setNewBlogTitle('')
        setNewBlogUrl('')
      })
      .catch(e => {
        setErrorMessage('Error: fill in all fields')
        console.log(e)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
  }
  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            setErrorMessage={setErrorMessage}
            setUser={setUser}

          />
        </Togglable>
      </div>
    )
  }
  const blogsForm = () => {
    return (
      <div>
        <Togglable buttonLabel='add new' ref={noteFormRef}>
          <BlogsForm
            handleNewBlog={handleNewBlog}
            newBlogTitle={newBlogTitle}
            newBlogAuthor={newBlogAuthor}
            newBlogUrl={newBlogUrl}
            setNewBlogTitle={setNewBlogTitle}
            setNewBlogAuthor={setNewBlogAuthor}
            setNewBlogUrl={setNewBlogUrl}
          />
        </Togglable>
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
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />)}
    </div>
  )

  const ErrorMessage = ({ message }) => {
    const errorMessageStyle = {
      border: '2px solid red',
      color: 'red',
      backgroundColor: '#d3d3d3',
      padding: '10px',
      borderRadius: '5px',
      display: 'inline-block',
      fontWeight: 'bold'
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
      border: '2px solid green',
      color: 'green',
      backgroundColor: '#d3d3d3',
      padding: '10px',
      borderRadius: '5px',
      display: 'inline-block',
      fontWeight: 'bold'
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

export default App