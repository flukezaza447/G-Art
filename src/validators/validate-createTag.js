import Joi from "joi";

const createTagSchema = Joi.object({
  TagName: Joi.string().trim(),
  image: Joi.string().trim()
}).or("TagName", "image");

const validateCreateTag = input => {
  const { error } = createTagSchema.validate(input, {
    abortEarly: false
  });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    });
    return result;
  }
};

export default validateCreateTag;
