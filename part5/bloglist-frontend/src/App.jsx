import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'

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
  }, [user])

  const handleSubmit = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login( {username, password} )
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

  return (
    <div>
      {errorMessage && <div style={{ color: 'red', border: '2px solid red', padding:'5px', backgroundColor:'lightgray' }}>{errorMessage}</div>}
      <h2>blogs</h2>
      {console.log(user)}
      {user && <h3>{user.name} logged in</h3>}
      {!user && <Login handleSubmit={handleSubmit} setPassword={setPassword} setUsername={setUsername}/>}
      {user && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App