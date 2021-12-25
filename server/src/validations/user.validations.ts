import Joi from 'joi';

const authSchema = Joi.object({
  username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_.-]+$')).min(5).max(15).required().messages({
    'any-required': 'Username is required',
    'string.pattern.base': 'Your username contains invalid characters',
    'string.min': 'Your username must be at least 5 characters long',
    'string.max': 'Your username cannot be longer than 30 characters',
  }),
  password: Joi.string().min(8).max(50).required().messages({
    'any-required': 'Password is required',
    'string.min': 'Your password must be at least 8 characters long',
    'string.max': 'Your password cannot be longer than 50 characters',
  }),
});

export const validateLogin = (data: any) => {
  const { error } = authSchema.validate(data);
  return {
    validationErrors: error,
  };
};

export const validateRegister = (data: any) => {
  const { error } = authSchema.validate(data);
  return {
    validationErrors: error,
  };
};
