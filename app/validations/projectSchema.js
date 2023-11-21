const Joi = require('joi');

const projectCreate = Joi.object({
  title: Joi.string()
    .max(30)
    .required(),
  description: Joi.string()
    .max(500)
    .required(),
  availability: Joi.boolean(),
  user_id: Joi.number().integer(),
  tags: Joi.array()
    .items(Joi.number().integer()),
});

const projectUpdate = Joi.object({
  title: Joi.string()
    .max(30),
  description: Joi.string()
    .max(500),
  availability: Joi.boolean(),
  user_id: Joi.number().integer(),
  tags: Joi.array()
    .items(Joi.number().integer()),
});

module.exports = { projectCreate, projectUpdate };
