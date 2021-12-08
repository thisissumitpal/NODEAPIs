const mongoose = require("mongoose");
const constants = require("../constants")
const { Schema } = mongoose;

const collegeSchema = new Schema( // create user schema and define user table structure 
    {
        name: {
            type: String,
            required: true,
            default: ""
        },
        address: {
            type: String,
            required: true,
            default: "",
        },
        contact: {
            type: Number,
            required: true,
        },
        active_year: {
            type: String,
            default: "",
        },

        //     accessToken : {
        //         type: String,
        //                 default :"",
        //     },
    }, {
        timestamps: true,
    }
);
//collegeSchema.methods.hash = (password) => bcrypt.hashSync(password, constants.saltRounds);
const college = mongoose.model("college", collegeSchema);
module.exports = college;