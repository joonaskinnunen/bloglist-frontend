import React from 'react'

const BlogsForm = ({
    handleNewBlog,
    newBlogTitle,
    setNewBlogTitle,
    newBlogAuthor,
    setNewBlogAuthor,
    newBlogUrl,
    setNewBlogUrl

}) => {
    return (
        <div>
            <h2>
                add a new blog
      </h2>
            <form onSubmit={handleNewBlog}>
                title <input type="text" name="Title" value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} /><br />
                author <input type="text" name="Author" value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} /><br />
                url <input type="text" name="Url" value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} /><br />
                <button type="submit">add</button>
            </form>
        </div>
    )
}
export default BlogsForm