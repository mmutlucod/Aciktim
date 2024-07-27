const { Product } = require('../models/productModel');
const db = require('../config/db');

const createProduct = async (req, res) => {
  try {
    const newProduct = await db.Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Ürün oluşturulurken hata oluştu.' });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Ürünler listelenirken hata oluştu.' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await db.Product.findByPk(req.params.productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Ürün bulunamadı.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ürün getirilirken hata oluştu.' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const [updatedRowCount, updatedProducts] = await db.Product.update(req.body, {
      where: { Product_Id: req.params.productId }
    });

    if (updatedRowCount > 0) {
      
      const updatedProduct = await db.Product.findByPk(req.params.productId);
      res.json(updatedProduct);
    } else {
     
      res.status(404).json({ message: 'Ürün bulunamadı.' });
    }
  } catch (error) {
 
    res.status(500).json({ message: 'Ürün güncellenirken hata oluştu.' });
  }
};

const deleteProduct = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
   
    await db.Orderdetail.destroy({
      where: { Product_Id: req.params.productId },
      transaction: t,
    });

    
    const deletedProduct = await db.Product.destroy({
      where: { Product_Id: req.params.productId },
      transaction: t,
    });

    if (deletedProduct === 1) {
   
      await t.commit();

      res.json({ message: 'Ürün ve ilişkili orderdetails kayıtları başarıyla silindi.' });
    } else if (deletedProduct === 0) {
      res.status(404).json({ message: 'Ürün bulunamadı.' });
    } else {
     
      console.error(`Beklenmeyen durum: ${deletedProduct} ürün silindi.`);
      res.status(500).json({ message: 'Ürün silinirken beklenmeyen bir hata oluştu.' });
    }
  } catch (error) {
   
    await t.rollback();

    console.error('Ürün silinirken hata oluştu:', error);
    res.status(500).json({ message: 'Ürün silinirken hata oluştu.', error: error.message });
  }
};



module.exports = {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  
};
