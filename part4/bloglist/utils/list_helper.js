const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const reducer = (max, blog) => {
    return max.likes > blog.likes ? max : blog
  }
  
  return blogs.reduce(reducer, 0);
}

const mostBlogs = (blogs) => {
  
  // Create an array of objects that hold the author name and their total blog count
  let counter = []
  for (let blog of blogs) {
    const index = counter.findIndex(entry => entry.author===blog.author);
    if (index !== -1){
      // If the author is already in the counter array, update the blogs count
      counter[index].blogs++
    } else {
      // Add the author to the counter array
      counter.push({'author':blog.author, 'blogs':1})
    }
  }

  // Loop and filter for the author with the most blogs
  // return an object with author name and blog count
  return counter.reduce((acc, cur) => {
    return cur.blogs > acc.blogs ? cur : acc
  }, {'author':undefined, 'blogs':0});
}

const mostLikes = (blogs) => {
  
  // Create an array of objects that hold the author name and their total like count
  let counter = []
  for (let blog of blogs) {
    const index = counter.findIndex(entry => entry.author===blog.author);
    if (index !== -1){
      // If the author is already in the counter array, update the likes count
      counter[index].likes += blog.likes
    } else {
      // Add the author to the counter array
      counter.push({'author':blog.author, 'likes': blog.likes})
    }
  }

  // Loop and filter for the author with the most likes
  // return an object with author name and like count
  return counter.reduce((acc, cur) => {
    return cur.likes > acc.likes ? cur : acc
  }, {'author':undefined, 'likes':0});
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}