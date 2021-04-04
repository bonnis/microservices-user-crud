const User = require('../models/User')
const bcrypt = require('bcrypt')

const userService ={

        index: async function(params) {
            try{
                return await User.find(params, {password:0}) 
            } catch(e){
                console.log(e)
                return null
            }
        },

        create: async function(attr){
            if(attr['password'])
                attr['password'] = await bcrypt.hash(attr['password'], 5)

            let user = new User(attr);

            try {
                await user.save()  
                user = user.toJSON()
                delete(user['password']);
                return user;
            } catch (e) {
                console.log(e)
                return null
            }
        },

        read: async function(userId){
            try{
                return await User.findById(userId, {password:0})
            } catch(e){
                console.log(e)
                return null
            }
        },

        update: async function(attr, userId){
            if(attr['password'])
                attr['password'] = await bcrypt.hash(attr['password'], 5)

            try{
                let doc = await User.findByIdAndUpdate(userId, attr) 
                doc = doc.toJSON()
                delete(doc['password']);
                return doc
            } catch(e){
                console.log(e)
                return null
            }
        },

        delete: async function(userId){
            try {
                let doc = await User.findByIdAndDelete(userId)  
                doc = doc.toJSON()
                delete(doc['password']);
                return doc
            } catch (e) {
                console.log(e)
                return null
            }
        },

        checkPassword : async function(password, username){
            try{
                let doc = await User.findOne({username:username})
                let truth = await bcrypt.compare(password, doc['password'])
                if(truth) {
                    doc = doc.toJSON()
                    delete(doc['password']);
                    return doc;
                }
            } catch(e){
                console.log(e)
                return null
            }
        }

}

module.exports = userService