const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chaiAsPromised = require("chai-as-promised");

const productServices = require("../../../src/services/products.service");
const productControllers = require("../../../src/controllers/products.controller");

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
        id: 1,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControllers.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  it("Non-existent id", async () => {
    sinon
      .stub(productServices, "getProductById")
      .throws({ status: 404, message: "Product not found" });

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

  it("Create product", async () => {
    const newProduct = {
      id: 4,
      name: "Produto novo",
    };
    sinon.stub(productServices, "createProduct").resolves(newProduct);

    const req = {
      body: {
        name: "Produto novo",
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControllers.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  it("Create invalid product name length", async () => {
    const errorMessage = {
      status: 422,
      message: '"name" length must be at least 5 characters long',
    };

    sinon.stub(productServices, "createProduct").throws(errorMessage);

    const req = {
      body: {
        name: "Pro",
      },
    };
    const res = {};

    await expect(productControllers.createProduct(req, res)).to.be.rejectedWith(
      errorMessage
    );
  });

  it("Create invalid product with no name", async () => {
    const errorMessage = {
      status: 400,
      message: '"name" is required',
    };

    sinon.stub(productServices, "createProduct").throws(errorMessage);

    const req = {
      body: {},
    };
    const res = {};

    await expect(productControllers.createProduct(req, res)).to.be.rejectedWith(
      errorMessage
    );
  });

  it("Update product", async () => {
    const updatedProduct = {
      id: 2,
      name: "Gatinho fofo",
    };
    sinon.stub(productServices, "updateProduct").resolves(updatedProduct);

    const req = {
      body: {
        name: "Gatinho fofo",
      },
      params: {
        id: 2,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControllers.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProduct);
  });

  it("Update invalid product name length", async () => {
    const errorMessage = {
      status: 422,
      message: '"name" length must be at least 5 characters long',
    };

    sinon.stub(productServices, "updateProduct").throws(errorMessage);

    const req = {
      body: {
        name: "Pro",
      },
      params: {
        id: 2,
      },
    };
    const res = {};

    await expect(productControllers.updateProduct(req, res)).to.be.rejectedWith(
      errorMessage
    );
  });

  it("Update invalid product with no name", async () => {
    const errorMessage = {
      status: 400,
      message: '"name" is required',
    };

    sinon.stub(productServices, "updateProduct").throws(errorMessage);

    const req = {
      body: {},
      params: {
        id: 2,
      },
    };
    const res = {};

    await expect(productControllers.updateProduct(req, res)).to.be.rejectedWith(
      errorMessage
    );
  });

  it("Delete product", async () => {
    sinon.stub(productServices, "deleteProduct").resolves();

    const req = {
      params: {
        id: 2,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControllers.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it("Delete with non-existent id", async () => {
    sinon
      .stub(productServices, "deleteProduct")
      .throws({ status: 404, message: "Product not found" });

    const req = {
      params: {
        id: 999,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await expect(
      productControllers.deleteProduct(req, res)
    ).to.be.rejectedWith({ status: 404, message: "Product not found" });
  });

  afterEach(() => {
    sinon.restore();
  });
});
