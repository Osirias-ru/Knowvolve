const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCourse = {
  body: Joi.object().keys({
    title: Joi.string().required().min(8).max(38),
    description: Joi.string().required().min(200).max(500),
    subjects: Joi.array().items(Joi.string().required()).required(),
    visibility: Joi.string().required().valid('public', 'private'),
    price: Joi.number().required(),
  }),
};

const getCourses = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCourse = {
    body: Joi.object().keys({
        id: Joi.string().custom(objectId),
    })
}

module.exports = {
  createCourse,
  getCourses,
  getCourse
};
