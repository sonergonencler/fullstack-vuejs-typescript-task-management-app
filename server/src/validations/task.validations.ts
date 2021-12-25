import Joi from 'joi';

const taskSchema = Joi.object({
  text: Joi.string().min(5).max(30).required().messages({
    'any-required': 'Username is required',
    'string.min': 'The value field must be at least 5 characters long',
    'string.max': 'The value field cannot be longer than 30 characters',
  }),
  isPinned: Joi.boolean().required().messages({
    'any-required': 'isPinned is required',
  }),
  isCompleted: Joi.boolean().required().messages({
    'any-required': 'isCompleted is required',
  }),
  list: Joi.required().messages({
    'any-required': 'List is required',
  }),
});

export const validateTask = (data: any) => {
  const { error } = taskSchema.validate(data);
  return {
    validationErrors: error,
  };
};
