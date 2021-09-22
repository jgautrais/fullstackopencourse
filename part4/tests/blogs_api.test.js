const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('../utils/list_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('content-type', /application\/json/);
});

describe('blog has id', () => {
  test('unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
    expect(response.body[0].__id).toBe(undefined);
  });
});

describe('making HTTP POST request to db', () => {
  test('total nb of blogs is increased by one', async () => {
    const blog = helper.newBlog;

    await blog.save();

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(response.body[6].title).toContain('New blog');
  });

  test('content of blog post is correctly saved to db', async () => {
    const blog = helper.newBlog;

    await blog.save();

    const response = await api.get('/api/blogs');
    expect(response.body[6].title).toContain('New blog');
  });
});

describe('if likes property us empty, default to 0', () => {
  test('likes property is 0', async () => {
    const blog = helper.newBlogWithOutLikes;

    await blog.save();

    const response = await api.get('/api/blogs');
    expect(response.body[6].likes).toBe(0);
  });
});

describe('if title is empty, respond 400 Bad Request', () => {
  test('status code is 400', async () => {
    const blog = helper.newBlogWithOutTitle;

    await api.post('/api/blogs').send(blog).expect(400);
  });
});

describe('if url is empty, respond 400 Bad Request', () => {
  test('status code is 400', async () => {
    const blog = helper.newBlogWithOutUrl;

    await api.post('/api/blogs').send(blog).expect(400);
  });
});

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain('React patterns');
});

afterAll(() => {
  mongoose.connection.close();
});
