const postRepository = require('../repositories/postRepository');
const {getPostsByUser} = require('../repositories/postRepository');
const jwt = require('jsonwebtoken');
const {secretKey} = require('../config');
const userRepository = require('../repositories/userRepository');

const generateAccessToken = (name, lastname, role, email, id, posts) => {
  const payload = {
    name,
    lastname,
    role,
    email,
    id,
    posts,
    exp: Math.floor(Date.now() / 1000) + (600000 * 2),
    iat: Math.floor(Date.now()),
  }
  return jwt.sign(payload, secretKey)
}

class postController{
  async getOne(req, res){
    try {
      const id = parseInt(req.params.id)
      res.send(await postRepository.getOne(id))
    }
    catch (err){
      console.log(err)
      res.status(500).send()
    }
  }
  async getAll(req, res){
    try {
      res.send(await postRepository.getAll())
    }
    catch (err){
      console.log(err)
      res.status(500).send()
    }
  }
  async create(req, res){
    try {
      const {title, text, id} = await req.body
      await postRepository.createPost(title, text, id)
      const posts = await getPostsByUser(id)
      const user = await userRepository.get(id)
      user.token = await generateAccessToken(user.name, user.lastname, "USER", user.email, id, posts);
      res.json(user)
    }
    catch (err){
      console.log(err)
      res.status(500).send()
    }
  }
  async delete(req, res){
    try{
      const id = parseInt(req.params.id);
      await postRepository.deletePost(id)
    } catch (e){
      console.log(e)
      res.status(400).json({message: "Egit error"})
    }
  }
}
module.exports = new postController()
