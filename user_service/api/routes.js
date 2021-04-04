const UserController = require("./UserController");
const OnlyAllowRole = require('../middleware/OnlyAllowRole')
const express = require('express')

const router = express.Router();

router.get('/', async (req, res)=>{
    res.send({
        'message':'User service at your service'
    })
})

router.get('/user', OnlyAllowRole(['admin']), UserController.index)
router.get('/user/auth', UserController.getAuthenticatedUser)
router.get('/user/:id', UserController.read)
router.post('/user/:username/password-check', UserController.checkPassword)
router.post('/user', OnlyAllowRole(['admin']), UserController.create)
router.put('/user/:id', OnlyAllowRole(['admin']), UserController.update)
router.delete('/user/:id', OnlyAllowRole(['admin']), UserController.delete)

module.exports = router