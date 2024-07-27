const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Orderdetail = sequelize.define('Orderdetail', {
    Productdetails_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Order_Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Product_Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    
  });

 
  Orderdetail.sync({ force: false })
    .then(() => {
      console.log('Orderdetails table created or updated.');
    })
    .catch(err => {
      console.error('Error creating Orderdetails table:', err);
    });

  return Orderdetail;
};
