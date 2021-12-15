const request = require("supertest");
const app = require("../index");
const postRepository = require('../repositories/postRepository');

describe("PostController test", () => {
  test("it should response the GET method", async () => {
    const posts = await postRepository.getAll()
    const response = await request(app).get("/post");
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(posts);
  });
  test("it should response the GET method with params", async () => {
    const post = await postRepository.getOne(1);
    const response = await request(app).get("/post/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(post);
  });
});
