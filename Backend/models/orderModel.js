const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    Order_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    User_Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Payment_Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Order_date: {
      type: DataTypes.DATE
    }
  });

  Order.sync({ force: false })
    .then(() => {
      console.log('Order table created or updated.');
    })
    .catch(err => {
      console.error('Error creating Order table:', err);
    });

  return Order;
};
