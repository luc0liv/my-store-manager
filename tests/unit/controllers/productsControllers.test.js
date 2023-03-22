const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chaiAsPromised = require("chai-as-promised");

const productServices = require("../../../src/services/products.service");
const productControllers = require('../../../src/controllers/products.controller');

const { products } = require("./mocks/products.controller.mock");

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("Testing products controllers", () => {
  it("Get products list", async () => {
    sinon.stub(productServices, "getAllProducts").resolves([products]);

    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControllers.getProducts(undefined, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it("Get product by id", async () => {
    sinon.stub(productServices, "getProductById").resolves(products[0]);

    const req = {
      params: {
        id: 1
      }
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControllers.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

    it("Non-existent id", async () => {
      sinon.stub(productServices, "getProductById").throws({ status: 404, message: 'Product not found' });

      const req = {
        params: {
          id: 999,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await expect(
        productControllers.getProductById(req, res)
      ).to.be.rejectedWith({ status: 404, message: "Product not found" });
    });

  afterEach(() => {
    sinon.restore();
  });
});
