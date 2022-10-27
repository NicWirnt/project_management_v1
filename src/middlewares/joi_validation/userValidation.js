import Joi from "joi";

const validator = (schema, req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    error.status = 200;
    return next(error);
  }

  next();
};

export const newUserValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().alphanum().required().min(3).max(20),
    lastName: Joi.string().alphanum().required().min(3).max(20),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().pattern(new RegExp(`^[a-zA-Z0-9]{3,30}$`)),
    dob: Joi.date().allow(null).allow(""),
    phone: Joi.string().required().min(10).max(15),
    address: Joi.string().allow(null).allow(""),
  });

  validator(schema, req, res, next);
};
