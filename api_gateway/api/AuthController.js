const AuthService = require('../services/AuthService')

const AuthController = {

    login: async (req, res)=>{
        let result = await AuthService.login(req.body.username,req.body.password)
        if(!result)
            res.status(400).send({
                error:"Gagal melakukan login, cek kredensial anda"
            })
        res.send({
            msg:"Login berhasil",
            ...result
        })
    },

    logout: async(req, res)=>{
        const accTok = req.headers['authorization'].split(' ')[1]
        let result = await AuthService.logout(accTok)
        if(!result)
            res.status(400).send({
                error:"Gagal melakukan logout"
            })
        res.send({
            msg:"Logout berhasil",
        })

    },

    refresh: async(req, res)=>{
        let result = await AuthService.refresh(req.body.refresh_token)
        if(!result)
            res.status(400).send({
                error:"Gagal melakukan refresh token"
            })
        res.send({
            msg:"Refresh token berhasil",
            ...result
        })
    },

}

module.exports = AuthController