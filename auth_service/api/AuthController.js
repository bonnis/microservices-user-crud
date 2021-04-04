const AuthService = require("../services/AuthService");

const AuthController = {
  login: async (req,res)=>{
    const tokens = await AuthService.login(req.body.username, req.body.password)
    if(!tokens)
      res.status(400).send({
        'error':'Failed to authenticate, check credentials.'
      })
    else
      res.send(tokens);
  },

  logout: async (req,res)=>{
    const result = await AuthService.logout(req.body.access_token)
    if(!result)
      res.status(400).send({
        'error':'Failed to logout'
      })
    else
      res.send(result);
  },

  validate: async (req,res)=>{
    const result = await AuthService.validate(req.body.access_token)
    if(!result)
      res.status(400).send({
        'error':'Failed to validate jwt'
      })
    else
      res.send(result);
  },

  refresh: async (req,res)=>{
    const tokens = await AuthService.refresh(req.body.refresh_token)
    if(!tokens)
      res.status(400).send({
        'error':'Failed to refresh'
      })
    else
      res.send(tokens);
  }

};

module.exports = AuthController;
