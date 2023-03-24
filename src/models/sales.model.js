const connection = require('./connection');

const createSales = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [newSale] = await connection.execute(query);
  return newSale.insertId;
};

const createSalesProducts = async ({ saleId, productId, quantity }) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES(?, ?, ?)`;
  const [newSale] = await connection.execute(query, [
    saleId,
    productId,
    quantity,
  ]);
  return newSale;
};

const getAllSales = async () => {
  const query = `SELECT id AS saleId, date, product_id AS productId, quantity
  FROM StoreManager.sales INNER JOIN StoreManager.sales_products
  ON id = sale_id`;
  const [sales] = await connection.execute(query);
  return sales;
};

const getSale = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';
  const [[sales]] = await connection.execute(query, [id]);
  return sales;
};

const getSaleById = async (id) => {
  const query = `SELECT date, product_id AS productId, quantity
  FROM StoreManager.sales INNER JOIN StoreManager.sales_products
  ON id = sale_id
  WHERE id = ?`;
  const [sale] = await connection.execute(query, [id]);
  return sale;
};

module.exports = {
  createSales,
  createSalesProducts,
  getAllSales,
  getSaleById,
  getSale,
};
