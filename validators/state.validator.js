const Joi = require('joi');

const StateSchema = {
    register: Joi.object().keys({
        state: Joi.string().required().error(() => {
            return { message: "statename is Required" }
        }),
      
       
       
    }),
};

module.exports = {
    '/State/register': StateSchema.register,
       //'/user/login': usersSchema.login,
    // '/update': usersSchemaudate,
    // '/nearestResta': usersSchema.nearestResta,
};