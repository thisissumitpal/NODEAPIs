const Joi = require('joi');

const userCollegeSchema = {
    userCollegeDataSave: Joi.object().keys({
        userId: Joi.string().required().error(() => {
            return { message: "userid is Required" }
        }),
        collegeId: Joi.string().required().error(() => {
            return { message: "collegeId is required" }
        }),
       
    }),
};

module.exports = {
    '/college/save': userCollegeSchema.userCollegeDataSave,
       //'/user/login': usersSchema.login,
    // '/update': usersSchemaudate,
    // '/nearestResta': usersSchema.nearestResta,
};