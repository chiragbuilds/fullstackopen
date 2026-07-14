const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog)=>{
        return sum += blog.likes
    },0)
}

const favoriteBlog = (blogs) => {
  const maxLike = Math.max(...blogs.map(b => b.likes))
  const favBlog = blogs.find(blog => blog.likes === maxLike)
  return favBlog
}

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
]



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  initialBlogs
}