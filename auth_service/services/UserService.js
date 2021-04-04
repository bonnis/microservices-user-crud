const axios = require('axios').default
const baseURL = process.env.USER_SERVICE_URL || 'http://userservice:3001'


const UserService = {
    
    read: async (userId)=>{
        try{
            let res = await axios.get(baseURL+'/user/'+userId);
            return res.data
        } catch(e){
            console.log(e)
            return null
        }

    },

    passwordCheck: async (username, password)=>{
        try{
            let res = await axios.post(baseURL+'/user/'+username+'/password-check',{
                password:password
            });
            return res.data
        } catch(e){
            console.log(e)
            return null
        }
    }


}

module.exports = UserService