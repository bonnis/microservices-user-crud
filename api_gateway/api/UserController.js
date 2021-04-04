const UserService = require("../services/UserService");

const UserController = {

  index: async (req, res) => {
    let result = await UserService.index(getHeaders(req),req.query)
    if(!result)
        res.status(400).send({
            error:"Terjadi masalah ketika mengambil data"
        })
    res.send({
        msg:"Daftar user",
        users:result
    })
  },

  create: async (req, res) => {
    let result = await UserService.create(getHeaders(req),req.body)
    if(!result)
        res.status(400).send({
            error:"Tidak bisa membuat user, lengkapi parameter atau ganti username"
        })
    res.send({
        msg:"Berhasil membuat user",
        user:result
    })

  },

  read: async (req, res) => {
    let result = await UserService.read(getHeaders(req),req.params.id)
    if(!result)
        res.status(404).send({
            error:"Tidak ditemukan"
        })
    res.send({
        msg:"Detail user",
        user:result
    })

  },

  update: async (req, res) => {
    let result = await UserService.update(getHeaders(req),req.body,req.params.id)
    if(!result)
        res.status(404).send({
            error:"Tidak ditemukan"
        })
    res.send({
        msg:"User berhasil diupdate",
        user:result
    })


  },

  delete: async (req, res) => {
    let result = await UserService.delete(getHeaders(req),req.params.id)
    if(!result)
        res.status(404).send({
            error:"Tidak ditemukan"
        })
    res.send({
        msg:"User berhasil dihapus",
        user:result
    })

  },

  getAuthenticatedUser: async(req,res)=>{
    let result = await UserService.getAuthenticatedUser(getHeaders(req))
    if(!result)
        res.status(404).send({
            error:"Tidak ditemukan"
        })
    res.send({
        msg:"User yang sedang login",
        user:result
    })
  }

};

function getHeaders(req){
  return{
    Role:req.headers['role'],
    UserId:req.headers['userid']
  }
}

module.exports = UserController;
