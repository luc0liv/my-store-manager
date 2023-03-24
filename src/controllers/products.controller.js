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

const createProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newProduct = await productsService.createProduct(name);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const newProduct = await productsService.updateProduct(id, name);
    res.status(200).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productsService.deleteProduct(id);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
