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

module.exports = {
  totalLikes,
  dummy,
  favoriteBlog,
};
