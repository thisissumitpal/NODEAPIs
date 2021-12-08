const mongoose = require("mongoose");
const constants = require("../constants")
const { Schema } = mongoose;

const countrySchema = new Schema(
    {
        country: {
            type: String,
            required: true,
            default: ""
        },
        status: {
            type: Boolean,
            default: true
        },

    } ,
{
    timestamps:true,
}

);
const country = mongoose.model("countrys", countrySchema);
module.exports = country;