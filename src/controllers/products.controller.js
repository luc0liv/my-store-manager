const productsService = require('../services/products.service');

const getProducts = async (_req, res) => {
  const [productsList] = await productsService.getAllProducts();
  res.status(200).json(productsList);
};

module.exports = {
  getProducts,
};
