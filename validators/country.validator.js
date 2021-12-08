const Joi = require('joi');

const countrySchema = {
    register: Joi.object().keys({
        country: Joi.string().required().error(() => {
            return { message: "countryname is Required" }
        }),
      
       
       
    }),
};

module.exports = {
    '/country/register': countrySchema.register,
       //'/user/login': usersSchema.login,
    // '/update': usersSchemaudate,
    // '/nearestResta': usersSchema.nearestResta,
};