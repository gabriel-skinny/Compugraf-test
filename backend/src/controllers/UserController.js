const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const data = req.body;

    const userExists = await User.findOne({ where: {email: data.email}})
        
    if(userExists){
      return res.status(400).json({ error: "User already exists"})
    }

    await User.create(data);

    return res.json(data);
  },

  async update(req, res) {
    const data = req.body;

    const user = await User.findByPk(req.userId)
        
    if(userExists){
      return res.status(400).json({ error: "User already exists"})
    }

    await user.update(data);

    return res.json(data);
  }
}