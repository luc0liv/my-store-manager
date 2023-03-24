const productsModel = require('../models/products.model');
const httpErrGenerator = require('../utils/httpErrorGenerator');
const { dictionary, productsValidation } = require('../schemas/productsSchema');

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
  const { error } = productsValidation([{ name: product }]);
  if (error) { throw httpErrGenerator(dictionary[error.details[0].type], error.message); }

  const newProduct = await productsModel.createProduct({ product });

  return { id: newProduct.insertId, name: product };
};

const updateProduct = async (id, productName) => {
  const { error } = productsValidation([{ name: productName }]);
  if (error) { throw httpErrGenerator(dictionary[error.details[0].type], error.message); }

  const product = await productsModel.getProductById(id);
  if (!product) {
    throw httpErrGenerator(404, 'Product not found');
  }

  await productsModel.updateProduct(id, productName);
  return { id, name: productName };
};

const deleteProduct = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) {
    throw httpErrGenerator(404, 'Product not found');
  }
  await productsModel.deleteProduct(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
