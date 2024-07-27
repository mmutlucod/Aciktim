const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    User_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Passwords: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Telephone: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true
    }
  });

  User.beforeCreate(async (user) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.Passwords, saltRounds);
    user.Passwords = hashedPassword;
  });

  User.sync({ force: false })
    .then(() => {
      console.log('Users table created or updated.');
    })
    .catch(err => {
      console.error('Error creating Users table:', err);
    });

  return User;
};
