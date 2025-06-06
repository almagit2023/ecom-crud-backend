const Joi = require('joi');

const productValidation = (req, res, next) => {
  const productValidationSchema = Joi.object({
    name: Joi.string().min(4).max(16).required(),
    category: Joi.string().required(),
    price: Joi.string().required(),
  });

  const { error } = productValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation Failed",
      error: error.details[0].message,
    });
  }

  // Validate image presence only for POST requests
  if (req.method === 'POST' && !req.file) {
    return res.status(400).json({
      message: "Image file is required for creating a product.",
    });
  }

  next();
};

module.exports = productValidation;
