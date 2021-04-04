const UserController = require("./UserController");
const AuthController = require("./AuthController");
const AuthMiddleware = require("../middleware/Authentication")
const express = require('express')

const router = express.Router();

router.get('/', async (req, res)=>{
    res.send({
        'message':'Api Gateway running.'
    })
})

router.get('/user', AuthMiddleware, UserController.index)
router.get('/user/auth', AuthMiddleware, UserController.getAuthenticatedUser)
router.get('/user/:id', AuthMiddleware, UserController.read)
router.post('/user', AuthMiddleware, UserController.create)
router.put('/user/:id', AuthMiddleware, UserController.update)
router.delete('/user/:id', AuthMiddleware, UserController.delete)

router.post('/auth/login', AuthController.login)
router.post('/auth/logout', AuthMiddleware, AuthController.logout)
router.post('/auth/refresh', AuthController.refresh)


module.exports = router