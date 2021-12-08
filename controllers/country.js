const Boom = require("boom"); //for use response formating
const fs = require("fs");
const countryModel = require("../models/country");
const mongoose = require("mongoose"); // mongoose database
const ObjectId = mongoose.Types.ObjectId;
const SendResponse = require("../apiHandler")
const jwtTokenGenerate = require("../util/jwt-token");

module.exports =
{
     countrydata: async(req,res) =>
        {
                try
                {
                 let CountryCompleteData = new countryModel(req.body);

                 await CountryCompleteData.save();


                 return SendResponse(res,{CountryCompleteData: CountryCompleteData},"Success");
                }catch(error)
                {
                    console.log(error);
                    return SendResponse(res, Boom.badImplementation())
                }
        },
        countryList:async (req,res) =>
        {
                try
                {
                 let countryData =  await countryModel.find();

                  


                 return SendResponse(res,{countryData: countryData},"Success");
                }catch(error)
                {
                    console.log(error);
                    return SendResponse(res, Boom.badImplementation())
                }
        },
        // countryList:(req,res) =>
        // {
        //         try{
        //                 let countryData = await countryModel(req.body);
        //                 return SendResponse(res,{Countrydata: countryData},"Success")
        //         }
       // }

        
}