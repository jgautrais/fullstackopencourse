const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/info', (request, response) => {
  let date = new Date();
  Blog.countDocuments().then((result) => {
    response.send(`<p>Db stores ${result} blogs</p><p>${date.toString()}</p>`);
  });
});

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.get('/:id', (request, response, next) => {
  const id = request.params.id;
  Blog.findById(id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.send(`<p>Resource bot found</p>`);
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogRouter;
