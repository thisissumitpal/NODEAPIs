const Joi = require('joi');

const usersSchema = {
    register: Joi.object().keys({
        name: Joi.string().required().error(() => {
            return { message: "username is Required" }
        }),
        email: Joi.string().email().required().error(() => {
            return { message: "email is Required" }
        }),
        gender: Joi.string().required().error(() => {
            return { message: "Gender is Required" }
        }),
        password: Joi.string().required().error(() => {
            return { message: "Password is required" }
        }),
        role: Joi.string().required().error(() => {
            return { message: "role is required" }
        })
    }),
    login: Joi.object().keys({
        email: Joi.string().email().required().error(() => {
            return { message: "email is Required" }
        }),
        password: Joi.string().required().error(() => {
            return { message: "Password is required" }
        })
    }),
    update: Joi.object().keys({
        username: Joi.string().required().error(() => {
            return { message: "username is Required" }
        }),
        email: Joi.string().email().required().error(() => {
            return { message: "email is Required" }
        }),
    }),

//     nearestResta: Joi.object().keys({
//         lat: Joi.string().required().error(() => {
//             return { message: "latitute is Required" }
//         }),
//         long: Joi.string().required().error(() => {
//             return { message: "longitute is Required" }
//         }),
//     })
 };

module.exports = {
    '/user/register': usersSchema.register,
   '/user/login': usersSchema.login,
   '/user/update': usersSchema.update,
    // '/update': usersSchemaudate,
    // '/nearestResta': usersSchema.nearestResta,
};