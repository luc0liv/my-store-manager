const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const productsList = connection.execute(query);
  return productsList;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const createProduct = async ({ product }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [newProduct] = await connection.execute(query, [product]);
  return newProduct.insertId;
};

const updateProduct = async (id, productName) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [product] = await connection.execute(query, [productName, id]);
  return product;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const [deletedProduct] = await connection.execute(query, [id]);
  return deletedProduct.affectedRows;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
