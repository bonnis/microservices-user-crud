const AuthService = require("../services/AuthService")

const Authentication = async (req,res,next)=>{
    const header = req.headers['authorization']
    try{
        let test = /^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(header)
        if(!test){
            res.status(401).send({
                error:"Authentication failed."
            })
        }
    } catch(e){
        res.status(401).send({
            error:"Authentication failed."
        })
    }
    
    
    const accTok = header.split(' ')[1]

    let result = await AuthService.validate(accTok)
    if(!result)
        res.status(401).send({
            error:"Authentication failed."
        })

    req.headers['userid'] = result._id
    req.headers['role'] = result.role

    next()

}

module.exports = Authentication