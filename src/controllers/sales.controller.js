const salesServices = require('../services/sales.service');

const createSales = async (req, res, next) => {
  try {
    const sales = req.body;
    const newSales = await salesServices.createSales(sales);
    res.status(201).json(newSales);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSales,
};
