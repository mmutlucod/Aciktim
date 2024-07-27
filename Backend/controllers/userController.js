// UserController.js
const { User } = require('../models/userModel');
const db = require('../config/db');
const  generateToken  = require('../auth');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const newUser = await db.User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı oluşturulurken hata oluştu.' });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcılar listelenirken hata oluştu.' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı getirilirken hata oluştu.' });
  }
};


const updateUser = async (req, res) => {
  try {
    const [affectedRows] = await db.User.update(req.body, {
      where: { User_Id: req.params.userId },
    });

    if (affectedRows === 1) {

      const updatedUser = await db.User.findByPk(req.params.userId);

      if (updatedUser) {
        // Token oluştur
        const token = jwt.sign({ userId: updatedUser.User_Id }, process.env.JWT_SECRET, {
          expiresIn: '1h', // Token süresi (örneğin 1 saat)
        });

        if (token) {
          //
          res.json({ user: updatedUser, token });
        } else {
          res.status(500).json({ message: 'Token oluşturulamadı.' });
        }
      } else {
        res.status(500).json({ message: 'Güncellenen kullanıcı getirilemedi.' });
      }
    } else {
      res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
  } catch (error) {
    console.error('Güncelleme hatası:', error);
    res.status(500).json({ message: 'Kullanıcı güncellenirken hata oluştu.' });
  }
};




const deleteUser = async (req, res) => {
  try {
    const deletedUser = await db.User.destroy({ where: { User_Id: req.params.userId } });
    if (deletedUser === 1) {
      res.json({ message: 'Kullanıcı silindi.' });
    } else {
      res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı silinirken hata oluştu.' });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { Email: req.body.email, Passwords: req.body.password } });
    if (user) {
      const token = jwt.sign({ userId: user.User_Id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token süresi (örneğin 1 saat)
      });
      res.status(200).json({
        status: "ok",
        user,
        token
      });
    } else {
      res.status(401).json({ message: 'Geçersiz kimlik bilgileri' });
    }
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ message: 'Hatalı giriş' });
  }
};

const registerUser = async (req, res) => {
  try {
    const newUser = await db.User.create(req.body);
    const token = jwt.sign({ userId: newUser.User_Id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token süresi (örneğin 1 saat)
    });
    res.status(201).json({ message: 'Kullanıcı oluşturuldu', token });
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı oluşturulurken hata oluştu.' });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await db.Order.findAll({
      attributes: ['Order_Id', 'User_Id', 'Order_Date'],
      where: {
        User_Id: userId,
      },
      include: [
        {
          model: db.Orderdetail,
          attributes: ['Product_Id', 'quantity'],
          include: [
            {
              model: db.Product,
              attributes: ['Product_Id', 'ProductName', 'price'],
            },
          ],
        },
        {
          model: db.User,
          attributes: ['User_Id', 'UserName', 'FullName', 'Address'],
        },
      ],
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Kullanıcının siparişleri listelenirken hata oluştu.' });
  }
};



module.exports = {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  registerUser,
  getUserOrders,

};
