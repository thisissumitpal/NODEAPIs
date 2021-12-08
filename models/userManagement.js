const mongoose = require("mongoose");
const constants = require("../constants");
const Boom = require("boom");
const fs = require("fs")
const Joi = require("joi"); // for use validator
const bcrypt = require("bcrypt");
const date = require("joi/lib/types/date");
const { Schema } = mongoose;

const userManagementSchema = new Schema(
{

    name: {
        type: String,
        required: true,
        default: ""
    },
    email:   {
        type:String,
        required:true,
        default:""
    },
    DOB: {
        type:String,
        required:true,
        default:""
    },
    gender:
    {
        type:String,
        enum:['male','female'],
        default:""
    },
    status:
    {
        type:Boolean,
        default:false
    },
    isDeleted:
    {
        type:Boolean,
        default:false
    },
    varifiedAt:{
       type:Date,
       default:"" 
    },
    image:
    {
        type:String,
        default:""
    },
    role:
    {
        type:String,
        enum:['admin','user'],
        default:""
    },
    accessToken: {
        type: String,
        default: "",
    },
},
{
    timestamps:true,
}



);

userManagementSchema.virtual("avatar").get(function() {
    return this.photo ? BASE_URL + this.photo : ``;
});

const userManagement = mongoose.model("userManagements", userManagementSchema);
module.exports = userManagement;