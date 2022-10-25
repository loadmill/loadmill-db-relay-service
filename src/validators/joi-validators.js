const { Joi } = require('express-validation')

let mongo = {
  connectionString: Joi.string().required(),
  collection: Joi.string().required(),
  query: Joi.object().optional(),
  command: Joi.string().required(),
  useUnifiedTopology: Joi.boolean().optional(),
  cursor: Joi.string().optional()
};
if (!process.env.ALLOW_ALTERING) {  
  mongo.command = Joi.string().valid('find').required()
} else {
  mongo.command = Joi.string()
    .valid('find')
    .valid('updateOne')
    .valid('updateMany')
    .valid('deleteOne')
    .valid('deleteMany')
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
