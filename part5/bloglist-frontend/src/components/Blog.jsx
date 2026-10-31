import { useState } from "react"

const Blog = ({ blog, handleLiked, user, handleDeleteBlog }) => {

  const [showInfo, setShowInfo] = useState(false)

  const displayWhenTrue = {display : showInfo ? '' : "none"}

  const stylish = {
    margin : '5px',
    padding : '5px',
    border : '2px solid black'
  }

  const toggleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  const liked = () => {
    handleLiked(blog)
  }
  return (
    <div style={stylish}>
      {blog.title} {blog.author}
      <button onClick={toggleShowInfo}>{showInfo ? 'hide' : 'show'}</button>
      <div style={displayWhenTrue}>
        {blog.url}
        <br />
        Likes : {blog.likes} <button onClick={liked}>like</button>
        <br />
        {blog.user.name}
        <br />
        {
          user.name === blog.user.name ? <button onClick={()=> handleDeleteBlog(blog)}>remove</button> : null
        }
      </div>
    </div>  
  )
}

export default Blog