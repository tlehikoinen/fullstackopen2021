
  const dummy = (blogs) => {
    return 1;
  }

  const totalLikes = (blogs) => {
    const sumBlogsLikes = (sum, item) => {
      return sum + item.likes
    }

    return blogs.length === 0
    ? 0
    : blogs.reduce(sumBlogsLikes, 0)
  }

  const favoriteBlog = (blogs) => {
    if(blogs.length === 0)
      return []

    const mostLiked = blogs.reduce((accumulator, currentValue, index) => {
      if (index === 0 || index === blogs.length) {
        return currentValue;
      }
      return accumulator.likes > currentValue.likes ? accumulator : currentValue;
    });
    return mostLiked
  }

  const mostBlogs = (blogs) => {
    if(blogs.length === 0)
      return []

    let length = blogs.length - 1

    const newBlogs = blogs
    .map(b => ({"author" : b.author, "blogs" : 1}))
    .sort((a,b) => a.author > b.author ? 1 : -1)

    for (let index = 0; index < length; index++) {
      if(newBlogs[index].author === newBlogs[index+1].author) {
        newBlogs[index+1].blogs += newBlogs[index].blogs
        newBlogs.splice(index, 1)
        index--
        length--
      }
    }

    const mostBlogs = newBlogs.reduce((accumulator, currentValue, index) => {
      if (index === 0 || index === blogs.length) {
        return currentValue
      }
      return accumulator.blogs > currentValue.blogs ? accumulator : currentValue
    })
    return mostBlogs
  }

  const mostLikes = (blogs) => {
    if(blogs.length === 0)
      return []

    let length = blogs.length - 1

    const newBlogs = blogs
    .map(b => ({"author" : b.author, "likes" : b.likes}))
    .sort((a,b) => a.author > b.author ? 1 : -1)

    for (let index = 0; index < length; index++) {
      if(newBlogs[index].author === newBlogs[index+1].author) {
        newBlogs[index+1].likes += newBlogs[index].likes
        newBlogs.splice(index, 1)
        index--
        length--
      }
    }

    const mostLikes = newBlogs.reduce((accumulator, currentValue, index) => {
      if (index === 0 || index === blogs.length) {
        return currentValue
      }
      return accumulator.likes > currentValue.likes ? accumulator : currentValue
    })
    return mostLikes
  }


  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }