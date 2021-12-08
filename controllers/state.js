const Boom = require("boom"); //for use response formating
const fs = require("fs");
const stateModel = require("../models/State");
const mongoose = require("mongoose"); // mongoose database
const ObjectId = mongoose.Types.ObjectId;
const SendResponse = require("../apiHandler")
const jwtTokenGenerate = require("../util/jwt-token");
const { badImplementation } = require("boom");

module.exports =
{
     stateData: async(req,res) =>
        {
                try
                {
                 let stateCompleteData = new stateModel(req.body);

                 await stateCompleteData.save();


                 return SendResponse(res,{stateCompleteData: stateCompleteData},"Success");
                }catch(error)
                {
                    console.log(error);
                    return SendResponse(res, Boom.badImplementation())
                }
        },
        getCountryData:async(req,res) =>
        {
                try
                {
                     //   let matchWithCountry = await req.body.code; //used to accquire the country id
                       // console.log(matchWithCountry);
                        let joinTablewithCountry= await stateModel.aggregate([{
                    
                                $lookup:                         //for users
                                  {
                                    from: "countrys",
                                    localField: "Countrycode",
                                    foreignField: "_id",
                                    as: "newStateTable"
                                  },
                                 
                                },
                                {
                                        $match:
                                        {
                                        Countrycode:ObjectId(req.body.Countrycode)
                                        }
                                        
                                },
                                {
                                        $project:
                                        {
                                                State:1,
                                                _id:0
                                        },
                                }

                        ])
                        return SendResponse(res,{joinTablewithCountry: joinTablewithCountry},"Success");      
                }catch(error)
                {
                        console.log(error);
                        return SendResponse(res,Boom,badImplementation())
                }
        }
}