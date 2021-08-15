const { Model, DataTypes } = require("sequelize");

class user extends Model {
  static init(connection) {
    super.init({
      nome: DataTypes.STRING,
      sobreNome: DataTypes.STRING,
      nacionalidade: DataTypes.STRING,
      cep: DataTypes.INTEGER,
      cpf: DataTypes.INTEGER,
      estado: DataTypes.STRING,
      cidade: DataTypes.STRING,
      logradouro  : DataTypes.STRING,
      email: DataTypes.STRING,
      telefone: DataTypes.INTEGER,
    }, {
      sequelize: connection
    })
  }
}

module.exports = user;