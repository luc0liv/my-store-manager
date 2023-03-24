const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');

const connection = require('../../../src/models/connection');
const { products } = require('./mocks/products.model.mock');

describe('Testes do model de products', () => {
  it('Get products list', async () => {
    sinon.stub(connection, 'execute').resolves([products]);

    const [result] = await productsModel.getAllProducts();

    expect(result).to.be.deep.equal(products);
  });

  it('Get product by id', async () => {
    sinon.stub(connection, 'execute').resolves([[products[2]]]);

    const result = await productsModel.getProductById(3);

    expect(result).to.be.deep.equal(products[2]);
  });

  it("Create product", async () => {
    sinon.stub(connection, "execute").resolves([{ insertId: 3 }]);

    const result = await productsModel.createProduct("Novo produto");

    expect(result).to.be.deep.equal(3);
  });

    it("Update product", async () => {
      sinon.stub(connection, "execute").resolves([1]);

      const result = await productsModel.updateProduct(3, "Novo produto");

      expect(result).to.be.deep.equal(1);
    });

    it("Delete product", async () => {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const result = await productsModel.deleteProduct(2);

      expect(result).to.be.deep.equal(1);
    });

  afterEach(() => {
    sinon.restore();
  })
});
