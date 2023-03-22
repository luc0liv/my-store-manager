const productsService = require('../services/products.service');

const getProducts = async (_req, res) => {
  const [productsList] = await productsService.getAllProducts();
  res.status(200).json(productsList);
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
};
