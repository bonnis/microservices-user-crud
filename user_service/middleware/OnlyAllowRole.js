const OnlyAllowRole = (roles)=>{
    return (req,res,next)=>{
        if(roles.indexOf(req.headers['role']) > -1)
            next()
        else
            res.status(403).send({
                error:"Forbidden"
            })
    }
}

module.exports = OnlyAllowRole