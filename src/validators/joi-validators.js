const { Joi } = require('express-validation')

const postrgesValidation = {
  body: Joi.object({
    connectionString: Joi.string().required(),
    query: Joi.string().required()
  })
};

const redisValidation = {
  body: Joi.object({
    connectionString: Joi.string().required(),
    command: Joi.string().required(),
    key: Joi.string().required(),
    field: Joi.string().optional()
  })
};

module.exports = {
  postrgesValidation,
  redisValidation
};