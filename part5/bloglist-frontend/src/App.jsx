import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Createblog from './components/Createblog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    } catch (error) {
      console.log(error);
      setErrorMessage('wrong credentials')
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateBlog = async(newBlogs) => {
    console.log(newBlogs)
    try{
      const newBlog = await blogService.create(newBlogs)
      setBlogs(blogs => blogs.concat(newBlog))
    }
    catch(e){
      setErrorMessage(e.message)
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
    }
  }

  return (
    <div>
      {errorMessage && <div style={{ color: 'red', border: '2px solid red', padding:'5px', backgroundColor:'lightgray' }}>{errorMessage}</div>}
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