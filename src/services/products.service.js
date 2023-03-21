const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const productsList = await productsModel.getAllProducts();
  return productsList;
};

module.exports = {
  getAllProducts,
};
