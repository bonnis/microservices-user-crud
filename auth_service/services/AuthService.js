const Keystore = require('../models/Keystore')
const UserService = require('./UserService')
const jwt = require('jsonwebtoken');
const api_secret = process.env.API_SECRET || 'default_auth_secret'

const AuthService ={

    login: async (username, password)=>{
        let user = await UserService.passwordCheck(username,password)
        if(!user){
            return null
        }

        let accKey = new Keystore({userId:user._id, status:true})
        await accKey.save()

        let refKey = new Keystore({userId:user._id, status:true, type:'ref'})
        await refKey.save()

        let accTok = jwt.sign({
            prm: accKey._id,
        }, api_secret, {
            issuer: 'localhost',
            audience: 'localhost',
            subject: user._id,
            expiresIn: "6h"
        })

        let refTok = jwt.sign({
            prm: refKey._id,
            scd: accKey._id
        }, api_secret, {
            issuer: 'localhost',
            audience: 'localhost',
            subject: user._id,
            expiresIn: "12w"
        })

        return {
            "access_token":accTok,
            "refresh_token":refTok
        }
    },

    logout: async (accessToken)=>{
        try {
            let decoded = jwt.verify(accessToken,api_secret,{ignoreExpiration:true})
            keystoreId = decoded.prm
            return await invalidate(keystoreId) 
        } catch (e) {
           console.log(e) 
           return null
        }

    },

    validate: async (accessToken)=>{
        let userId, keystoreId
        try{
            let decoded = jwt.verify(accessToken,api_secret)
            userId = decoded.sub
            keystoreId = decoded.prm
        } catch(e){
            console.log(e)
            return null
        }

        let user = await UserService.read(userId)
        if(!user){
            return null
        }

        try {
            let key = await Keystore.findById(keystoreId)
            if(!key || key.userId!==userId || !key.status ||key.type!=='acc')
                return null

            return user
        } catch (e) {
            return null
        }

    },

    refresh: async (refreshToken)=>{
        let userId, keystoreId
        try{
            let decoded = jwt.verify(refreshToken,api_secret)
            userId = decoded.sub
            keystoreId = decoded.prm
            accId = decoded.scd
        } catch(e){
            console.log(e)
            return null
        }

        let user = await UserService.read(userId)
        if(!user){
            return null
        }

        try {
            let key = await Keystore.findById(keystoreId)
            if(!key || key.userId!==userId || !key.status || key.type!=="ref")
                return null
            
            key.status = false
            key.save()
            
            let accKey = new Keystore({userId:user._id, status:true})
            await accKey.save()

            let refKey = new Keystore({userId:user._id, status:true, type:'ref'})
            await refKey.save()

            let accTok = jwt.sign({
                prm: accKey._id,
            }, api_secret, {
                issuer: 'localhost',
                audience: 'localhost',
                subject: user._id,
                expiresIn: "6h"
            })

            let refTok = jwt.sign({
                prm: refKey._id,
                scd: accKey._id
            }, api_secret, {
                issuer: 'localhost',
                audience: 'localhost',
                subject: user._id,
                expiresIn: "3m"
            })

            invalidate(accId)

            return {
                "access_token":accTok,
                "refresh_token":refTok
            }

        } catch (e) {
            return null
        }
    }

}

async function invalidate(keystoreId){
    try{
        let key = await Keystore.findByIdAndUpdate(keystoreId, {$set:{status:false}})
        return key
    } catch(e){
        console.log(e)
        return null
    }
}

module.exports = AuthService