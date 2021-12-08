const Joi = require('joi');

const collegeSchema = {
    register: Joi.object().keys({
        name: Joi.string().required().error(() => {
            return { message: "Collegename is Required" }
        }),
        address: Joi.string().required().error(() => {
            return { message: "address is Required" }
        }),
        contact: Joi.number().required().error(() => {
            return { message: "contact is Required" }
        }),
        active_year: Joi.string().required().error(() => {
            return { message: "Active_year is required" }
        }),
    }),
};

module.exports = {
    '/college/register': collegeSchema.register,
       //'/user/login': usersSchema.login,
    // '/update': usersSchemaudate,
    // '/nearestResta': usersSchema.nearestResta,
};