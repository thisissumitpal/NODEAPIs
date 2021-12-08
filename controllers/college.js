const Boom = require("boom"); //for use response formating
const fs = require("fs");
const collegeModel = require("../models/college");
const mongoose = require("mongoose"); // mongoose database
const ObjectId = mongoose.Types.ObjectId;
const SendResponse = require("../apiHandler")
const jwtTokenGenerate = require("../util/jwt-token");
module.exports = {
    register: async(req, res) => { // write register function and 
        try {
            let CheckCollegeName = await collegeModel.findOne({ name: req.body.name });
            if (CheckCollegeName) return SendResponse(res, Boom.conflict("name is already exists"))
            let college = new collegeModel(req.body);
            await college.save();
            return SendResponse(res, { college: college }, "Success");
        } catch (error) {
            console.log(error);
            return SendResponse(res, Boom.badImplementation()) // error response
        }
    },




    //      userlist: async (req,res)=>{
    //     try{
    //     let userlist = await userModel.find();
    //  return SendResponse(res,{userlist: userlist},"success")
    // } catch(error){
    //     console.log(error);
    //             return SendResponse(res, Boom.badImplementation())
    // }

    // },
    // login : async(req,res)=> {
    //     try {

    //         // check email from collection field
    //         const user = await userModel.findOne({ email: req.body.email })

    //         // if email not found
    //         if (!user) return SendResponse(res, Boom.conflict("Email not found"))

    //         // if password is incorrect
    //         if (! await user.passwordVerify(req.body.password)) return SendResponse(res, Boom.conflict("Incorrect password"))

    //         // heper function to use generate token
    //         user.accessToken = await jwtTokenGenerate.generateToken(user);
    //         // update jwt token in user collection after login
    //         // await userModel.findOneAndUpdate(
    //         //     { _id: user._id },
    //         //     { $set: { token: user.token } },
    //         //     { new: true }
    //         // );
    //         return SendResponse(res, { user: user }, "login successfully");

    //     } catch (err) {
    //         // console.log(err);
    //         return SendResponse(res, Boom.badImplementation());
    //     }


    //}
}