const { PaymentType } = require('../models/paymentModel'); 
const db = require('../config/db');

const PaymentTypeController = {
  createPaymentType: async (req, res) => {
    try {
      const newPaymentType = await db.Payment.create(req.body);
      res.status(201).json(newPaymentType);
    } catch (error) {
      res.status(500).json({ message: 'Ödeme türü oluşturulurken hata oluştu.' });
    }
  },

  listPaymentTypes: async (req, res) => {
    try {
      const paymentTypes = await db.Payment.findAll();
      res.json(paymentTypes);
    } catch (error) {
      res.status(500).json({ message: 'Ödeme türleri listelenirken hata oluştu.' });
    }
  },

  getPaymentTypeById: async (req, res) => {
    try {
      const paymentType = await db.Payment.findByPk(req.params.paymentTypeId);
      if (paymentType) {
        res.json(paymentType);
      } else {
        res.status(404).json({ message: 'Ödeme türü bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ödeme türü getirilirken hata oluştu.' });
    }
  },

  updatePaymentType: async (req, res) => {
    try {
      const updatedPaymentType = await db.Payment.update(req.body, {
        where: { Payment_Id: req.params.paymentTypeId },
        returning: true
      });
      if (updatedPaymentType[0] === 1) {
        res.json(updatedPaymentType[1][0]);
      } else {
        res.status(404).json({ message: 'Ödeme türü bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ödeme türü güncellenirken hata oluştu.' });
    }
  },

  deletePaymentType: async (req, res) => {
    try {
      const deletedPaymentType = await db.Payment.destroy({ where: { Payment_Id: req.params.paymentTypeId } });
      if (deletedPaymentType === 1) {
        res.json({ message: 'Ödeme türü silindi.' });
      } else {
        res.status(404).json({ message: 'Ödeme türü bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ödeme türü silinirken hata oluştu.' });
    }
  }
};

module.exports = PaymentTypeController;