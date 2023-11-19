import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "string.empty": "first name is required"
  }),

  lastName: Joi.string().trim().required().messages({
    "string.empty": "last name is required"
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "email is required",
    "string.email": "email must be a valid email"
  }),
  password: Joi.string().alphanum().min(6).required().trim().messages({
    "string.empty": "password is required",
    "string.alphanum": "password must contain number or alphabet",
    "string.min": "password must have at least 6 characters"
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .trim()
    .messages({
      "any.only": "password and confirm password did not match",
      "string.empty": "confirm password is required"
    })
});

const validateRegister = input => {
  const { error } = registerSchema.validate(input, {
    abortEarly: false
  });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default validateRegister;
