const { Order } = require('../models/orderModel');
const { Orderdetail } = require('../models/orderdetailModel');
const db = require('../config/db');

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const newOrder = await db.Order.create(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Sipariş oluşturulurken hata oluştu.' });
    }
  },
  listOrders: async (req, res) => {
    try {

      const orders = await db.Order.findAll({
        attributes: ['Order_Id', 'User_Id', 'Order_Date'],
        raw: true,
        nest: true,
      });
  
      const orderIds = orders.map(order => order.Order_Id);
      const orderDetails = await db.Orderdetail.findAll({
        where: {
          Order_Id: orderIds,
        },
        attributes: ['Order_Id', 'Product_Id', 'quantity'],
        raw: true,
        nest: true,
      });
  
    
      const productIds = orderDetails.map(detail => detail.Product_Id);
  
  
      const productDetails = await db.Product.findAll({
        where: {
          Product_Id: productIds,
        },
        attributes: ['Product_Id', 'ProductName', 'price'],
        raw: true,
        nest: true,
      });
  
      
      const userIds = orders.map(order => order.User_Id);
      const userDetails = await db.User.findAll({
        where: {
          User_Id: userIds,
        },
        attributes: ['User_Id', 'UserName', 'FullName', 'Address'],
        raw: true,
        nest: true,
      });
  
  
      const result = orders.map(order => {
        return {
          ...order,
          User: userDetails.find(user => user.User_Id === order.User_Id),
          Orderdetails: orderDetails
            .filter(detail => detail.Order_Id === order.Order_Id)
            .map(detail => ({
              ...detail,
              ProductDetails: productDetails.find(product => product.Product_Id === detail.Product_Id),
            })),
        };
      });
  
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Siparişler listelenirken hata oluştu.' });
    }
  },
  
  listUserOrders: async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const orders = await db.Order.findAll({
        where: {
          User_Id: userId,
        },
        attributes: ['Order_Id', 'User_Id', 'Order_Date'],
        raw: true,
        nest: true,
      });
  
      const orderIds = orders.map(order => order.Order_Id);
      const orderDetails = await db.Orderdetail.findAll({
        where: {
          Order_Id: orderIds,
        },
        attributes: ['Order_Id', 'Product_Id', 'quantity'],
        raw: true,
        nest: true,
      });
  
      const productIds = orderDetails.map(detail => detail.Product_Id);
  
      const productDetails = await db.Product.findAll({
        where: {
          Product_Id: productIds,
        },
        attributes: ['Product_Id', 'ProductName', 'price'],
        raw: true,
        nest: true,
      });
  
      const userDetails = await db.User.findByPk(userId, {
        attributes: ['User_Id', 'UserName', 'FullName', 'Address'],
        raw: true,
        nest: true,
      });
  
      const result = orders.map(order => {
        return {
          ...order,
          User: userDetails,
          Orderdetails: orderDetails
            .filter(detail => detail.Order_Id === order.Order_Id)
            .map(detail => ({
              ...detail,
              ProductDetails: productDetails.find(product => product.Product_Id === detail.Product_Id),
            })),
        };
      });
  
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Siparişler listelenirken hata oluştu.' });
    }
  },
  
  getOrderById: async (req, res) => {
    try {
      const order = await db.Order.findByPk(req.params.orderId);
      if (order) {
        res.json(order);
      } else {
        console.log('Sipariş bulunamadı. ID:', req.params.orderId);
        res.status(404).json({ message: 'Sipariş bulunamadı.' });
      }
    } catch (error) {
      console.error('Sipariş getirilirken hata oluştu:', error);
      res.status(500).json({ message: 'Sipariş getirilirken hata oluştu.' });
    }
  },
  

  updateOrder: async (req, res) => {
    try {
      const updatedOrder = await db.Order.update(req.body, {
        where: { Order_Id: req.params.orderId },
        returning: true
      });
      if (updatedOrder[0] === 1) {
        res.json(updatedOrder[1][0]);
      } else {
        res.status(404).json({ message: 'Sipariş bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Sipariş güncellenirken hata oluştu.' });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const deletedOrder = await db.Order.destroy({ where: { Order_Id: req.params.orderId } });
      if (deletedOrder === 1) {
        res.json({ message: 'Sipariş silindi.' });
      } else {
        res.status(404).json({ message: 'Sipariş bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Sipariş silinirken hata oluştu.' });
    }
  }
};

module.exports = OrderController;






