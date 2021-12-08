const mongoose = require("mongoose");
const constants = require("../constants");
const Boom = require("boom");
const fs = require("fs")
const Joi = require("joi"); // for use validator
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const usersSchema = new Schema( // create user schema and define user table structure 
    {
        name: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        //registerationDate: {
        //  type: Date,
        // default: Date.now,
        // },
      
        gender: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        location: {
            type: {
                type: String,
                default: 'point',
            },
            coordinates: [Number],
        },
        // token: {
        //     type: String,
        //     default: "",
        // },
        // status: {
        //     type: Boolean,
        //     default: true,
        // },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
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
usersSchema.methods.hash = (password) => bcrypt.hashSync(password, constants.saltRounds);

// password verify function 
usersSchema.methods.passwordVerify = async function(password) {
    return await bcrypt.compare(password, this.password)
}

usersSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

usersSchema.virtual("avatar").get(function() {
    return this.photo ? BASE_URL + this.photo : ``;
});
const users = mongoose.model("users", usersSchema);
module.exports = users;