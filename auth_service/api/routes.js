const AuthController = require("./AuthController");
const express = require('express')

const router = express.Router();

router.get('/', async (req, res)=>{
    res.send({
        'message':'Auth service at your service'
    })
})

router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/refresh', AuthController.refresh)
router.post('/validate', AuthController.validate)


module.exports = router