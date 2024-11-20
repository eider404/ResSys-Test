const yup = require('yup');

const validateSchema = (schema) => async (req, res, next) => {
  try {
    
    req.body = await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
};

module.exports = validateSchema;
