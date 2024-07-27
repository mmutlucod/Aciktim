const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const PaymentType = sequelize.define('PaymentType', {
    Payment_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Payment_Type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  PaymentType.sync({ force: false })
    .then(() => {
      console.log('PaymentType table created or updated.');
    })
    .catch(err => {
      console.error('Error creating PaymentType table:', err);
    });

  return PaymentType;
};
