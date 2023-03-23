const productsModel = require('../models/products.model');
const httpErrGenerator = require('../utils/httpErrorGenerator');

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

const createProduct = async (product) => {
  if (!product) {
    throw httpErrGenerator(400, '"name" is required');
  }
  if (product.length < 5) {
    throw httpErrGenerator(422, '"name" length must be at least 5 characters long');
  }
  const newProduct = await productsModel.createProduct({ product });
  return { id: newProduct.insertId, name: product };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
