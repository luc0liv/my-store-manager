const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required().label('name'),
}).messages({
  'any.required': '{{#label}} is required',
  'string.min': '{{#label}} length must be at least {{#limit}} characters long',
});

const dictionary = {
  'string.min': 422,
  'any.required': 400,
};

const productArraySchema = Joi.array().items(productSchema);

const productsValidation = (product) => productArraySchema.validate(product);

module.exports = { productsValidation, dictionary };
