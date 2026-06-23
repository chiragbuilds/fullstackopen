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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}