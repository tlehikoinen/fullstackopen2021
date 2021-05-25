
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


  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }