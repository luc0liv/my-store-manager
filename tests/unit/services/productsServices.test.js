const chai = require('chai');
const { expect } = chai;
const sinon = require("sinon");
const chaiAsPromised = require('chai-as-promised');
const productServices = require('../../../src/services/products.service');
const productModels = require('../../../src/models/products.model');

const { products } = require("./mocks/products.service.mock");

chai.use(chaiAsPromised);

const invalidId = 102;
const error = {
  status: 404,
  message: "Product not found",
};

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
    await expect(productServices.getProductById(invalidId)).to.be.rejectedWith(error);
  });

  it("Create product", async () => {
      const newProduct = {
        id: 5,
        name: "Produto novo",
      };
      sinon.stub(productModels, "createProduct").resolves(5);

    const result = await productServices.createProduct("Produto novo");

      expect(result).to.be.deep.equal(newProduct);
  });

  it("Update product", async () => {
    const newProduct = {
      id: 3,
      name: "Produto novo",
    };
    sinon.stub(productModels, "updateProduct").resolves();

    const result = await productServices.updateProduct(3, "Produto novo");

    expect(result).to.be.deep.equal(newProduct);
  });

    it("Update product with invalid id", async () => {
      sinon.stub(productModels, "updateProduct").resolves();

      await expect(
        productServices.updateProduct(invalidId, "Produto novo")
      ).to.be.rejectedWith(error);
    });


    it("Delete product", async () => {
      sinon.stub(productModels, "deleteProduct").resolves(1);

      const result = await productServices.deleteProduct(3);

      expect(result).to.be.deep.equal(1);
    });

    it("Delete product with invalid id", async () => {
      sinon.stub(productModels, "deleteProduct").resolves();

      await expect(
        productServices.deleteProduct(invalidId, "Produto novo")
      ).to.be.rejectedWith(error);
    });

  afterEach(() => {
    sinon.restore();
  });
});
