const Joi = require('joi');


const userManagementSchema = {
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
        DOB: Joi.string().required().error(() => {
            return { message: "DOB is Required" }
        }),
        // password: Joi.string().required().error(() => {
        //     return { message: "Password is required" }
        // }),
        // role: Joi.string().required().error(() => {
        //     return { message: "role is required" }
        // })
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
   '/userManagement/register':userManagementSchema.register
    // '/update': usersSchemaudate,
    // '/nearestResta': usersSchema.nearestResta,
};