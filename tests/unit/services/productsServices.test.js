const chai = require('chai');
const { expect } = chai;
const sinon = require("sinon");
const chaiAsPromised = require('chai-as-promised');
const productServices = require('../../../src/services/products.service');
const productModels = require('../../../src/models/products.model');

const { products } = require("./mocks/products.service.mock");

chai.use(chaiAsPromised);

describe("Testing products services", () => {
  it("Get products list", async () => {
    sinon.stub(productModels, 'getAllProducts').resolves([products]);

    const [result] = await productServices.getAllProducts();

    expect(result).to.be.deep.equal(products);
  });

  it("Get product by id", async () => {
    sinon.stub(productModels, 'getProductById').resolves([[products[2]]]);

    const [[result]] = await productServices.getProductById(3);

    expect(result).to.be.deep.equal(products[2]);
  });

  it("Non-existent id", async () => {
    const invalidId = 102;
    const error = {
      status: 404,
      message: 'Product not found',
    }

    await expect(productServices.getProductById(invalidId)).to.be.rejectedWith(error);
  });

  afterEach(() => {
    sinon.restore();
  });
});
