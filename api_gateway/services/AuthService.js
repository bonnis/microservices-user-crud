const axios = require('axios').default
const baseURL = process.env.AUTH_SERVICE_URL || 'http://authservice:3000'

const AuthService = {

    login: async (username, password)=>{
        try {
            let res = await axios.post(baseURL + '/login', {
                username:username,
                password:password
            })  
            return res.data;
        } catch (e) {
            console.log(e)   
            return null
        }
    },

    logout: async (accessToken)=>{
        try {
            let res = await axios.post(baseURL + '/logout', {
                access_token:accessToken
            })  
            return res.data;
        } catch (e) {
            console.log(e)   
            return null
        }
    },

    validate: async (accessToken)=>{
        try {
            let res = await axios.post(baseURL + '/validate', {
                access_token:accessToken
            })  
            return res.data;
        } catch (e) {
            console.log(e)   
            return null
        }
    },

    refresh: async (refreshToken)=>{
        try {
            let res = await axios.post(baseURL + '/refresh', {
                refresh_token:refreshToken
            })  
            return res.data;
        } catch (e) {
            console.log(e)   
            return null
        }
    },

}

module.exports = AuthService