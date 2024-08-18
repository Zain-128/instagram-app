import Joi from "joi";

// Define the Joi schema
const userSchema = Joi.object({
  username: Joi.string().required().max(255).messages({
    "string.empty": "Username is required",
    "string.max": "Username must be less than 256 characters",
  }),
  email: Joi.string().email().required().max(255).messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
    "string.max": "Email must be less than 256 characters",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
  //   profilePic: Joi.string().uri().allow(""),
  //   bio: Joi.string().allow(""),
  //   followers: Joi.array().items(Joi.string().hex().length(24)),
  //   following: Joi.array().items(Joi.string().hex().length(24)),
  //   posts: Joi.array().items(Joi.string().hex().length(24)),
  //   bookmarks: Joi.array().items(Joi.string().hex().length(24)),
  //   gender: Joi.string().valid("male", "female", "other").optional(),
});

const userLoginSchema = Joi.object({
  username: Joi.string().required().max(255).messages({
    "string.empty": "Username is required",
    "string.max": "Username must be less than 256 characters",
  }),

  password: Joi.string().required().min(6).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});

// Custom validator for MongoDB ObjectId
const objectIdValidator = (value, helpers) => {
  if (!/^[0-9a-fA-F]{24}$/.test(value)) {
    return helpers.message("Invalid ObjectId");
  }
  return value;
};

const objectIdSchema = Joi.string().custom(
  objectIdValidator,
  "MongoDB ObjectId"
);
export { userSchema, userLoginSchema, objectIdSchema };
