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

const getAllSales = async (_req, res) => {
  const sales = await salesServices.getAllSales();
  res.status(200).json(sales);
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.getSaleById(id);
    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
};
