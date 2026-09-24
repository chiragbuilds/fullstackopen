import React, { useState } from 'react'

const Createblog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const {handleCreateBlog} = props
  

  const handleSubmit = (e) => {
    e.preventDefault()

    handleCreateBlog({title, author, url})
    
    setTitle('')
    setAuthor('')
    setUrl('')
}

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h5>Create a new blog:</h5>
            <label >
                Title:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required/>
            </label>
            <br />
            <label >
                Author:
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required/>
            </label>
            <br />
            <label >
                Url:
                <input type="text" value={url} onChange={e => setUrl(e.target.value)} required/>
            </label>
            <br />
            <button type='submit'>create</button>
            <br />
        </form>
    </div>
  )
}

export default Createblog