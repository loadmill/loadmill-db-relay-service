const { Joi } = require('express-validation')

const sqlServerValidation = {
  body: Joi.object({
    connectionString: Joi.string().required(),
    query: Joi.string().required()
  })
};

const redisValidation = {
  body: Joi.object({
    connectionString: Joi.string().required(),
    command: Joi.string().valid('get', 'hget', 'hgetall').required(),
    key: Joi.string().required(),
    field: Joi.string().optional()
  })
};

const mongoValidation = {
  body: Joi.object({
    connectionString: Joi.string().required(),
    collection: Joi.string().required(),
    command: Joi.string().valid('find').required(),
    query: Joi.object().optional(),
    cursor: Joi.string().optional()
  })
};

module.exports = {
  sqlServerValidation,
  redisValidation,
  mongoValidation
};
