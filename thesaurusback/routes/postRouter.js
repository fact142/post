const Router = require('express').Router
const postController = require('../controllers/postController')

const postRouter = Router();
postRouter.get('', postController.getAll)
postRouter.post('', postController.create)
postRouter.delete('/:id', postController.delete)
postRouter.get('/:id', postController.getOne)

module.exports = postRouter
