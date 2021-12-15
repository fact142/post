const userRepository = require('../repositories/userRepository')
const jwt = require('jsonwebtoken');
const {secretKey} = require('../config');
const {getPostsByUser} = require('../repositories/postRepository');

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

class userController{
  async getAll(req, res){
    try {
      res.send(await userRepository.getAll())
    }
    catch (err){
      console.log(err)
      res.status(500).send()
    }
  }
  async getOne(req, res){
    try {
      const id = parseInt(req.params.id);
      res.send(await userRepository.get(id))
    }
    catch (err){
      console.log(err)
      res.status(500).send()
    }
  }
  async edit(req, res){
    try{
      const { name, lastname, email } = await req.body
      const user = { name, lastname, email };
      const id = parseInt(req.params.id);
      const data = await userRepository.put(id, user)
      const posts = await getPostsByUser(id)
      const token = generateAccessToken(name, lastname, "USER", email, id, posts)
      data.token = token;
      res.json(data)
    } catch (e){
      console.log(e)
      res.status(400).json({message: "Egit error"})
    }
  }
  g
}
module.exports = new userController()
