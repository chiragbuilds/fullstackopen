import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Createblog from './components/Createblog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [msgType, setMsgType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUser = window.localStorage.getItem("loggedBlogappUser")
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const notification = (msg, type) => {
    setMessage(msg)
    setMsgType(type)
    setTimeout(()=>{
      setMessage(null)
      setMsgType(null)
    },5000)
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login( {username, password} )
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
      notification('logged in successfully', 'success')
    } catch (error) {
      console.log(error);
      notification('wrong username or password', 'error')
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    notification('logged out successfully', 'success')
  }

  const handleCreateBlog = async(newBlogs) => {
    console.log(newBlogs)
    try{
      const newBlog = await blogService.create(newBlogs)
      setBlogs(blogs => blogs.concat(newBlog))
      notification(`added ${newBlog.title}`, 'success')
    }
    catch(e){
      notification(`${e.message}`, 'error')
    }
  }

  return (
    <div>
      {message && <Notification message={message} msgType={msgType}/>}
      <h2>blogs</h2>

      {user && 
        <div>
          <h5>{user.name} logged in<button onClick={handleLogOut}>log out</button></h5> 
        </div>
      }

      {user && <Createblog handleCreateBlog={handleCreateBlog}/>}

      {!user && <Login handleSubmit={handleSubmit} setPassword={setPassword} setUsername={setUsername}/>}

      {user && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
      }

      
    </div>
  )
}

export default App