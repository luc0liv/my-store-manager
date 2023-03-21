const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const productsList = connection.execute(query);
  return productsList;
};

module.exports = {
  getAllProducts,
};
