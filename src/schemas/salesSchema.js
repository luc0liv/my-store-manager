const Joi = require('joi');

const salesSchema = Joi.object({
  productId: Joi.number().required().label('productId'),
  quantity: Joi.number().min(1).required().label('quantity'),
}).messages({
  'any.required': '{{#label}} is required',
  'number.min': '{{#label}} must be greater than or equal to {{#limit}}',
});

module.exports = salesSchema;
