const Joi = require('joi');

const userCreate = Joi.object({
  lastname: Joi.string()
    .max(30)
    .required(),
  firstname: Joi.string()
    .max(30)
    .required(),
  pseudo: Joi.string()
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .pattern(new RegExp())
    .required(),
  description: Joi.string()
    .required(),
  picture: Joi.string(),
  availability: Joi.boolean(),
  tags: Joi.array()
    .items(Joi.number().integer()),
});

const userUpdate = Joi.object({
  lastname: Joi.string()
    .max(30),
  firstname: Joi.string()
    .max(30),
  pseudo: Joi.string()
    .max(30),
  email: Joi.string()
    .email({ minDomainSegments: 2 }),
  password: Joi.string().allow('')
    .pattern(new RegExp()),
  description: Joi.string(),
  picture: Joi.string(),
  availability: Joi.boolean(),
  tags: Joi.array()
    .items(Joi.number().integer()),
});

module.exports = { userCreate, userUpdate };
