import React from 'react'
const loginForm = ({
  handleLogin,
  username,
  password,
  setPassword,
  setUsername
}) => {
  return (
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
}

export default loginForm