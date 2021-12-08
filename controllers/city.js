const Boom = require("boom"); //for use response formating
const fs = require("fs");
const cityModel = require("../models/City");
const mongoose = require("mongoose"); // mongoose database
const ObjectId = mongoose.Types.ObjectId;
const SendResponse = require("../apiHandler")
const jwtTokenGenerate = require("../util/jwt-token");

module.exports =
{
        citydata: async (req, res) => {
                try {
                        let cityCompleteData = await cityModel(req.body).save();
                        return SendResponse(res, { cityCompleteData: cityCompleteData }, "Success");
                } catch (error) {
                        console.log(error);
                        return SendResponse(res, Boom.badImplementation())
                }
        },
        getStateData:async(req,res) =>
        {
                try
                {
                        let joinTablewithCity= await cityModel.aggregate([{
                    
                                $lookup:                         //for users
                                  {
                                    from: "states",
                                    localField: "stateId",
                                    foreignField: "_id",
                                    as: "newCityTable"
                                  },
                                },
                                {
                                        $match:
                                        {
                                                stateId:ObjectId(req.body.stateId)
                                        }
                                },
                                {
                                        $project:
                                        {
                                                city:1,
                                                _id:0
                                        },
                                }
                        ])
                        return SendResponse(res,{joinTablewithCity: joinTablewithCity},"Success");      
                }catch(error)
                {
                        console.log(error);
                        return SendResponse(res,Boom,badImplementation())
                }
        }
}