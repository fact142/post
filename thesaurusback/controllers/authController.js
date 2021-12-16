const authRepository = require('../repositories/authRepository')
const userRepository = require('../repositories/userRepository')
const { secretKey } = require('../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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

class authController{
  async registration(req, res){
    try{
      const { name, lastname, email, password, } = req.body
      const user = await authRepository.findByEmail(email)
      if(user){
        return res.status(400).json({message: "User with same email is already exist "})
      }
      const salt = await bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt)
      const newUser = {
        name, lastname, role: "USER", email, password: hashPassword
      }
      await userRepository.post(newUser)
      return res.json({message: "User registered successfully"})
    } catch (e){
      console.log(e)
      res.status(400).json({message: "Registration error"})
    }
  }
  async login(req, res){
    try{
      const { email, password } = await req.body
      const user = await authRepository.findByEmail(email)
      if(!user){
        return res.status(400).json({message: "User with your email doesn't exist"})
      }
      const isValidPassword = bcrypt.compareSync(password, user.password)
      if(!isValidPassword){
        return res.status(400).json({message: "Wrong password"})
      }
      const posts = await getPostsByUser(user.id_user)
      const token = generateAccessToken(user.name, user.lastname, user.role, user.email, user.id_user, posts)
      return res.json({token: token})
    } catch (e){
      console.log(e)
      res.status(400).json({message: "Login error"})
    }
  }
  async auth(req, res){
    try{
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, secretKey)
      res.json(user)
    }catch (e){
      console.log(e)
      res.status(400).json({message: "Auth error"})
    }
  }
}
module.exports = new authController()
