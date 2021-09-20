const _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let mostLikes = 0;
  const blog = {
    title: '',
    author: '',
    likes: '',
  };

  blogs.forEach((item) => {
    if (item.likes > mostLikes) {
      mostLikes = item.likes;
      blog.title = item.title;
      blog.author = item.author;
      blog.likes = item.likes;
    }
  });

  return blog;
};

const mostIteratee = (blog) => blog.author;

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const blogsByAuthor = _.groupBy(blogs, mostIteratee);
  const numberBlogsByAuthor = _.mapValues(
    blogsByAuthor,
    (array) => array.length
  );
  const authorMostBlogs = Object.entries(numberBlogsByAuthor).reduce((a, b) =>
    a[1] > b[1] ? a : b
  );
  return {
    author: authorMostBlogs[0],
    blogs: authorMostBlogs[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const blogsByAuthor = _.groupBy(blogs, mostIteratee);
  const likesByAuthor = _.mapValues(blogsByAuthor, (blogs) =>
    totalLikes(blogs)
  );
  const authorMostLikes = Object.entries(likesByAuthor).reduce((a, b) =>
    a[1] > b[1] ? a : b
  );
  return {
    author: authorMostLikes[0],
    likes: authorMostLikes[1],
  };
};

module.exports = {
  totalLikes,
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
