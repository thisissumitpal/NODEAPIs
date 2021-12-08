const boolean = require("joi/lib/types/boolean");
const mongoose = require("mongoose");
const constants = require("../constants")
const { Schema } = mongoose;

const StateSchema=new Schema({
    State: {
        type: String,
        required: true,
        default: ""
    },
    Countrycode:
    {
        type:mongoose.Types.ObjectId,
       ref:"countrys"
    },
    status:
    {
         type:Boolean,
         default:true
    },
    // countryId:
    // {
    //     type:mongoose.Types.ObjectId,
    //     ref:"countrys"
    // }
},
{
    timestamps:true,
});
const State = mongoose.model("States", StateSchema);
module.exports = State;