const { Joi } = require('express-validation')
const { METHODS } = require('../constants/mongo.js');

let mongo = {
  connectionString: Joi.string().required(),
  collection: Joi.string().required(),
  query: Joi.alternatives().try(Joi.object(), Joi.array()).optional(),
  command: Joi.string().required(),
  useUnifiedTopology: Joi.boolean().optional(),
  cursor: Joi.string().optional()
};
if (!process.env.ALLOW_ALTERING) {  
  mongo.command = Joi.string().valid(METHODS.FIND).required()
} else {
  mongo.command = Joi.string()
    .valid(
      METHODS.FIND,
      METHODS.UPDATE_ONE,
      METHODS.UPDATE_MANY,
      METHODS.DELETE_ONE,
      METHODS.DELETE_MANY,
      METHODS.INSERT_ONE,
      METHODS.INSERT_MANY,
    )
    .required()
  mongo.update = Joi.object().optional()
}

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
  body: Joi.object(mongo)
};

module.exports = {
  sqlServerValidation,
  redisValidation,
  mongoValidation
};
