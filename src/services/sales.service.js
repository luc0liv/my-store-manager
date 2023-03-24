const Joi = require('joi');
const salesSchema = require('../schemas/salesSchema');
const httpErrGenerator = require('../utils/httpErrorGenerator');
const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const dictionary = {
  'number.min': 422,
  'any.required': 400,
};

const createSales = async (sales) => {
  const salesArraySchema = Joi.array().items(salesSchema);
  const { error } = salesArraySchema.validate(sales);
  if (error) throw httpErrGenerator(dictionary[error.details[0].type], error.message);

  const productsIds = await Promise.all(
    sales.map((sale) => productsModel.getProductById(sale.productId)),
  );

  const isProductInvalid = productsIds.some((prod) => !prod);
  if (isProductInvalid) {
    throw httpErrGenerator(404, 'Product not found');
  }
  const salesId = await salesModel.createSales();

  await Promise.all(sales
    .map((sale) => salesModel.createSalesProducts({ saleId: salesId, ...sale })));

  return {
    id: salesId,
    itemsSold: sales,
  };
};

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => {
  const isIdValid = await salesModel.getSale(id);
  if (!isIdValid) throw httpErrGenerator(404, 'Sale not found');

  const saleById = await salesModel.getSaleById(id);
  return saleById;
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
};
