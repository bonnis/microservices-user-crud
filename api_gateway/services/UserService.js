const axios = require('axios').default
const baseURL = process.env.USER_SERVICE_URL || 'http://userservice:3000'

const userService ={

    index: async function(headers,params) {
        try {
            let res = await axios.get(baseURL + '/user', {params:params, headers:headers})
            return res.data;
        } catch (e) {
            console.log(e)   
            return null
        }
    },

    create: async function(headers,attr){
        try {
            let res = await axios.post(baseURL + '/user', attr, {headers:headers})  
            return res.data;
        } catch (e) {
            console.log(e)   
            return null
        }
    },

    read: async function(headers,userId){
        try {
            let res = await axios.get(baseURL + '/user/' + userId,{headers:headers})  
            return res.data;
        } catch (e) {
            console.log(e)   
            return null
        }

    },

    update: async function(headers,attr, userId){
        try {
            let res = await axios.put(baseURL + '/user/' + userId, attr, {headers:headers})  
            return res.data;
        } catch (e) {
            console.log(e)   
            return null
        }

    },

    delete: async function(headers,userId){
        try {
            let res = await axios.delete(baseURL + '/user/' + userId, {headers:headers})  
            return res.data;
        } catch (e) {
            console.log(e)   
            return null
        }

    },

    getAuthenticatedUser: async function(headers){
        try {
            let res = await axios.get(baseURL + '/user/auth', {headers:headers})  
            return res.data;
        } catch (e) {
            console.log(e)   
            return null
        }
    }

}

module.exports = userService