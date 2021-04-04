const userService = require("../services/UserService");

const UserController = {
  index: async (req, res) => {
    let params = {};

    if (req.query.name) params["name"] = req.query.name;
    if (req.query.username) params["username"] = req.query.username;

    const docs = await userService.index(params);
    if (docs) res.send(docs);
    else
      res.status(404).send({
        error: "Nothing found",
      });
  },

  create: async (req, res) => {
    const doc = await userService.create(req.body);

    if (doc) res.send(doc);
    else
      res.status(400).send({
        error: "Failed to make user",
      });
  },

  read: async (req, res) => {
    if(req.headers['role'] && req.headers['role']!=='admin' && req.headers['userid']!==req.params.id)
      res.status(403).send({
        error:"Forbidden"
      })

    const doc = await userService.read(req.params.id);

    if (doc) res.send(doc);
    else
      res.status(404).send({
        error: "Nothing found",
      });
  },

  update: async (req, res) => {
    const doc = await userService.update(req.body, req.params.id);

    if (doc) res.send(doc);
    else
      res.status(400).send({
        error: "Failed to update",
      });
  },

  delete: async (req, res) => {
    const doc = await userService.delete(req.params.id);

    if (doc) res.send(doc);
    else
      res.status(400).send({
        error: "Failed to delete",
      });
  },

  checkPassword: async (req, res) => {
    const doc = await userService.checkPassword(
      req.body.password,
      req.params.username
    );

    if (doc)
      res.send(doc);
    else
      res.status(400).send({
          msg:"Matching error"
      })
  },

  getAuthenticatedUser: async (req, res)=>{
    const doc = await userService.read(req.header('userid'));

    if (doc) res.send(doc);
    else
      res.status(404).send({
        error: "No user found",
      });
  }

};

module.exports = UserController;
