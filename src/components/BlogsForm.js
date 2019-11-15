import React from 'react'
import blogService from '../services/blogs'
import useField from '../hooks/index'

const BlogsForm = ({ setBlogs, setErrorMessage, setNotificationMessage, blogsFormRef }) => {
  const title = useField('text')
  const url = useField('text')
  const author = useField('text')

  const handleNewBlog = (event) => {
    event.preventDefault()
    blogsFormRef.current.toggleVisibility()
    const newObject = {
      title: title.value,
      url: url.value,
      author: author.value
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
        setNotificationMessage(`A new blog ${title.value} by ${author.value} added`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 4000)
        title.reset()
        author.reset()
        url.reset()
      })
      .catch(e => {
        setErrorMessage('Error: fill in all fields')
        console.log(e)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
  }
  return (
    <div>
      <h2>
      add a new blog
      </h2>
      <form onSubmit={handleNewBlog}>
                title <input {...title} /><br />
                author <input {...author} /><br />
                url <input {...url} /><br />
        <button type="submit">add</button>
      </form>
    </div>
  )
}
export default BlogsForm