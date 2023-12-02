import Joi from "joi";

const createPostSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "post name is required"
  }),
  description: Joi.string().trim().required().messages({
    "string.empty": "description is required"
  }),
  tagId: Joi.string().required().messages({
    "string.empty": "tag name is required"
  }),
  image: Joi.array()
    .items(
      Joi.object({
        image: Joi.any()
          .required()
          .messages({ "any.required": "image is required" })
      })
    )
    .required()
    .messages({
      "array.base": "image is required"
    })
});

const validateCreatePost = input => {
  const { error } = createPostSchema.validate(input, {
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

export default validateCreatePost;
