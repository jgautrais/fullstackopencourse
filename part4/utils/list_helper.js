const _ = require('lodash');
const Blog = require('../models/blog');

const dummy = () => {
  return 1;
};

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const newBlog = new Blog({
  title: 'New blog',
  author: 'Jeremy Gautrais',
  url: 'https://jeremygautrais.fr',
  likes: 7,
});

const newBlogWithOutLikes = new Blog({
  title: 'New blog',
  author: 'Jeremy Gautrais',
  url: 'https://jeremygautrais.fr',
});

const newBlogWithOutTitle = new Blog({
  author: 'Jeremy Gautrais',
  url: 'https://jeremygautrais.fr',
});

const newBlogWithOutUrl = new Blog({
  title: 'New blog',
  author: 'Jeremy Gautrais',
});

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
  initialBlogs,
  newBlog,
  newBlogWithOutLikes,
  newBlogWithOutTitle,
  newBlogWithOutUrl,
};
