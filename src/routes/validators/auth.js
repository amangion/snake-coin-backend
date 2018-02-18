import Joi from 'joi';

const login = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
};

export default login;
