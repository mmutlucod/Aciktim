const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    pool: {
      max: 1000,
      min: 0,
      acquire: parseInt(process.env.POOL_ACQUIRE),
      idle: parseInt(process.env.POOL_IDLE),
    },
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/userModel")(sequelize, DataTypes);
db.Product = require("../models/productModel")(sequelize, DataTypes);
db.PaymentType = require("../models/paymentModel")(sequelize, DataTypes);
db.Order = require("../models/orderModel")(sequelize, DataTypes);
db.Orderdetail = require("../models/orderdetailModel")(sequelize, DataTypes);

sequelize.sync({ force: false })
  .then(() => {
    console.log("Database synced successfully!");
  })
  .catch(err => {
    console.error("Database sync error:", err);
  });

module.exports = db;
