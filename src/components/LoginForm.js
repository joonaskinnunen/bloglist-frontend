import React, { useEffect } from 'react'
import useField from '../hooks/index'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setErrorMessage, setUser }) => {
  const username = useField('text')
  const password = useField('text')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)
      blogService.setToken(user.token)
    }
  }, [setUser])

  const handleLogin = async (event) => {
    event.preventDefault()
    const nameValue = username.value
    const passwordValue = password.value
    try {
      const user = await loginService.login({
        username: nameValue,
        password: passwordValue
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (e) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          <span>username </span>
          <input {...username} />
        </div>
        <div>
          <span>password </span>
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>

  )
}

export default LoginForm