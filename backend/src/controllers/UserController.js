const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const data = req.body;

    const userExists = await User.findOne({ where: { email: data.email }})
    
    if(userExists) {
      return res.status(400).json({ error: "E-mail already in use"});     
    } 

    const cpfUsed = await User.findOne({ where: { cpf: data.cpf }});

    if(cpfUsed) {
      return res.status(400).json({ error: "CPF already used"});
    }

    await User.create(data);

    return res.json(data);
  },

  async list(req, res){
    const users = await User.findAll();

    return res.json(users)
  },

  async consult(req, res){
    const { id } = req.params;
    
    const users = await User.findOne({where: { id }});

    if(!users) {
      return res.status(400).json({ error: "User not found"});     
    }  

    return res.json(users)
  },

  async update(req, res) {
    const data = req.body;
    const { id } = req.params;

    const user = await User.findByPk(id);
    
    if (user.email !== data.email) {
      const userExists = await User.findOne({ where: { email: data.email}});

      if(userExists) {
        return res.status(400).json({ error: "E-mail already in use"}); 
      }   
    }

    if (user.cpf != data.cpf) {
      console.log({
        usercpf: user.cpf,
        data: data.cpf
      })
      const cpfUsed = await User.findOne({ where: { cpf: data.cpf}});

      if(cpfUsed) {
        return res.status(400).json({ error: "CPF already used"});
      };    
    }

    await user.update(data);

    return res.json(data);
  },

  async delete(req, res) {
    const { id } = req.params;
 
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: "User does not exists"});
    };

    await user.destroy();

    return res.json(user);
  }
}