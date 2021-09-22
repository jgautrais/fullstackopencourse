const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/info', async (request, response) => {
  const date = new Date();
  const blogCount = await Blog.countDocuments();
  response.send(
    `<p>Database stores ${blogCount} blogs</p><p>${date.toString()}</p>`
  );
});

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  if (blog) {
    response.json(blog);
  } else {
    response.send('<p>Resource bot found</p>');
    response.status(404).end();
  }
});

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

module.exports = blogRouter;
