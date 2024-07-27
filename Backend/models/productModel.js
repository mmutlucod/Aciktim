const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    Product_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    ProductDescription: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.STRING(10, 2),
      allowNull: false
    },
    ProductPhoto: {
      type: DataTypes.BLOB
    }
  });
 
  Product.sync({ force: false })
    .then(() => {
      console.log('Product table created or updated.');
    })
    .catch(err => {
      console.error('Error creating Product table:', err);
    });

  return Product;
};
