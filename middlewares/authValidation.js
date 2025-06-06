const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const signupValidationSchema = Joi.object({
        name : Joi.string().min(3).max(25).required(),
        email : Joi.string().email().required(),
        password: Joi.string().min(6).max(24).required()
    })

    const {error} = signupValidationSchema.validate(req.body);

    if(error){
        res.status(404).json({
            message : "Bad Request",
            error
        })
    }

    next();
}

const loginValidation = (req, res, next) => {
    const signupValidationSchema = Joi.object({
        email : Joi.string().email().required(),
        password: Joi.string().min(6).max(24).required()
    })

    const {error} = signupValidationSchema.validate(req.body);

    if(error){
        res.status(404).json({
            message : "Bad Request",
            error
        })
    }

    next();
}

module.exports = {
    signupValidation,
    loginValidation
}




