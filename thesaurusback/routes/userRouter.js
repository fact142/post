const Router = require('express').Router
const userController = require('../controllers/userController')

const userRouter = Router();
userRouter.put('/:id', userController.edit)
// userRouter.route('/')
//   .get(async (req, res) => {
//     try {
//       res.send(await userRepository.getAll())
//     }
//     catch (err){
//       console.log(err)
//       res.status(500).send()
//     }
//   })
//   .post(async (req, res) => {
//     const {name, lastname, role, email, password} = req.body
//     try{
//       res.send(await userRepository.post(req.body))
//     }
//     catch (err){
//       console.log(err)
//       res.status(500).send()
//     }
//   })
// userRouter.route('/:id')
//   .get(async (req, res) => {
//     try{
//       const id = parseInt(req.params.id);
//       res.send(await userRepository.get(id))
//     }
//     catch (err){
//       console.log(err)
//       res.status(500).send()
//     }
//   })
//   .put(async (req, res) => {
//     try{
//       const id = parseInt(req.params.id)
//       const user = {
//         user_name: req.body.user_name,
//         user_password: req.body.user_password,
//         user_email: req.body.user_email
//       }
//       res.send(await userRepository.put(id, user))
//     }
//     catch(err){
//       console.log(err)
//       res.status(500).send()
//     }
//   })
//   .delete(async (req, res) => {
//     try{
//       const id = parseInt(req.params.id)
//       res.send(await userRepository.remove(id))
//     }
//     catch(err){
//       console.log(err)
//       res.status(500).send()
//     }
//   })
//
module.exports = userRouter
