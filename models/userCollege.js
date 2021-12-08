const mongoose = require("mongoose");
const constants = require("../constants");
const Boom = require("boom");
const fs = require("fs")
const Joi = require("joi"); // for use validator
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const usersCollegeSchema = new Schema( // create user schema and define user table structure 
    {
        userId: {
            type:mongoose.Types.ObjectId,
            ref:"users",
        },
        collegeId:{
            type:mongoose.Types.ObjectId,
            ref:"colleges",
        },
        accessToken: {
            type: String,
            default: "",
        },

        //     officename: [
        //         {
        //             name: {
        //                 type: String,
        //                 default: null,
        //             },
        //             address: {
        //                 type: String,
        //                 default: null,
        //             },
        //         },
        //     ],
        //     deviceToken: {
        //         type: String,
        //         default: "",
        //     },
    }, {
        timestamps: true,
    }
);
// password encrypt function
// usersCollegeSchema.methods.hash = (password) => bcrypt.hashSync(password, constants.saltRounds);

// // password verify function 
// usersCollegeSchema.methods.passwordVerify = async function(password) {
//     return await bcrypt.compare(password, this.password)
// }

// usersCollegeSchema.methods.toJSON = function() {
//     var obj = this.toObject();
//     delete obj.password;
//     return obj;
// };

// usersCollegeSchema.virtual("avatar").get(function() {
//     return this.photo ? BASE_URL + this.photo : ``;
// });
const userCollege = mongoose.model("userCollege", usersCollegeSchema);
module.exports = userCollege;