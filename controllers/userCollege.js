const Boom = require("boom"); //for use response formating
const fs = require("fs");
const userCollegeModel = require("../models/userCollege");
const mongoose = require("mongoose"); // mongoose database
const ObjectId = mongoose.Types.ObjectId;
const SendResponse = require("../apiHandler")
const jwtTokenGenerate = require("../util/jwt-token");
module.exports = {
    userCollegeDataSave: async (req, res) => { // write register function and 
        try {
            //  let CheckUserEmail = await userModel.findOne({email:req.body.email});
            //  if (CheckUserEmail) return SendResponse(res,Boom.conflict("email is already exists"))
             let userCollege = new userCollegeModel(req.body);
            //  user.password=user.hash(user.password)
                      await userCollege.save();
                     
                      // generate jwt token
        //                  user.accessToken = await jwtTokenGenerate.generateToken(user);
        //    delete user.password;
        

        return SendResponse(res,{userCollege: userCollege},"Success");
        } catch (error) {
            console.log(error);
            return SendResponse(res, Boom.badImplementation()) // error response
        }
    },
    dataList: async(req, res) =>{
        try
        {
                let CheckUserData= await userCollegeModel.aggregate([{
                    
                        $lookup:                         //for users
                          {
                            from: "users",
                            localField: "userId",
                            foreignField: "_id",
                            as: "newUserTable"
                          },
                        },
                              
                              {
                                $unwind: "$newUserTable"
                              },
                            {
                              $lookup:                  //for college
                              {
                                from: "colleges",
                                localField: "collegeId",
                                foreignField: "_id",
                                as: "newUserTable"
                              },
                            },
                              
                                  
                                  {
                                    $unwind: "$newUserTable"
                                  },
                             
                     
                ])
                return SendResponse(res,{CheckUserData: CheckUserData},"Success");
        }catch(error)
        {
            console.log(error);
            return SendResponse(res,Boom.badImplementation())
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
       

   // }
}