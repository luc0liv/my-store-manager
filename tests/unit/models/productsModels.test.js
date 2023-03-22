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

  afterEach(() => {
    sinon.restore();
  })
});
