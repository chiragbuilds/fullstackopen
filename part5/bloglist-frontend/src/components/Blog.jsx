import { useState } from "react"

const Blog = ({ blog }) => {

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

  // console.log(blog)
  return (
    <div style={stylish}>
      {blog.title} {blog.author}
      <button onClick={toggleShowInfo}>{showInfo ? 'hide' : 'show'}</button>
      <div style={displayWhenTrue}>
        {blog.url}
        <br />
        Likes : {blog.likes} <button >like</button>
        <br />
        {blog.user.name}
      </div>
    </div>  
  )
}

export default Blog