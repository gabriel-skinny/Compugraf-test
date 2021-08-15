const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const data = req.body;

    const userExists = await User.findOne({ where: { email: data.email }})
        
    if(userExists) res.status(400).json({ error: "User already exists"});

    await User.create(data);

    return res.json(data);
  },

  async list(req, res){
    const users = await User.findAll();

    return res.json(users)
  },

  async update(req, res) {
    const data = req.body;
    const { id } = req.params;

    const user = await User.findByPk(id);
    
    if (user.email !== data.email) {
      const userExists = await User.findOne({ where: { email: data.email}});

      if(userExists) res.status(400).json({ error: "E-mail already in use"});    
    }

    await user.update(data);

    return res.json(data);
  },

  async delete(req, res) {
    const { id } = req.params;
 
    const user = await User.findByPk(id);

    if (!user) res.status(400).json({ error: "User does not exists"});

    await user.destroy();

    return res.json(user);
  }
}