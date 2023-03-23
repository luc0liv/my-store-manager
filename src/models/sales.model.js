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

module.exports = {
  createSales,
  createSalesProducts,
};
