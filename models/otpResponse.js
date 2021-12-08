const mongoose = require("mongoose");
const constants = require("../constants");
const Boom = require("boom");
const fs = require("fs")
const Joi = require("joi"); // for use validator
const bcrypt = require("bcrypt");
const { Schema } = mongoose;


const otpSchema = new Schema( // create user schema and define user table structure 
{
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    }
},{
        timestamps: true,
    }
);
const otpRes = mongoose.model("otpres", otpSchema);
module.exports = otpRes;