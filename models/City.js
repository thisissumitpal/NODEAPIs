const boolean = require("joi/lib/types/boolean");
const mongoose = require("mongoose");
const constants = require("../constants")
const { Schema } = mongoose;

const citySchema = new Schema(
    {

        city:
        {
            type: String,
            required: true,
            default: ""
        },
    //     code:
    //     {
    //     type:String,
    //     required:true,
    //     default:""
    //    },
        status:
        {
            type: Boolean,
            default: true

        },
        stateId:
        {
            type: mongoose.Types.ObjectId,
            ref: "States"
        },





    },
    {
        timestamps: true,
    });
const city = mongoose.model("citys", citySchema);
module.exports = city;