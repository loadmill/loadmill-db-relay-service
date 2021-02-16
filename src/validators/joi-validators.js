const { Joi } = require('express-validation')

const relationalDbValidation = {
  body: Joi.object({
    connectionString: Joi.string().required(),
    query: Joi.string().required()
    })
};

module.exports = {
  relationalDbValidation
};