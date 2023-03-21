const productsModel = require('../models/products.model');

const httpErrGenerator = (status, message) => ({ status, message });

const getAllProducts = async () => {
  const productsList = await productsModel.getAllProducts();
  return productsList;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) {
    throw httpErrGenerator(404, 'Product not found');
  }
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};
