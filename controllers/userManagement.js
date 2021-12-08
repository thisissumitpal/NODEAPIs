const Boom = require("boom"); //for use response formating
const fs = require("fs");
const userManagementModel = require("../models/userManagement");
const otpModel = require("../models/otpResponse");
const mongoose = require("mongoose"); // mongoose database
const ObjectId = mongoose.Types.ObjectId;
const FileUpload = require("../services/files");
const SendResponse = require("../apiHandler")
const jwtTokenGenerate = require("../util/jwt-token");
const bcrypt = require("bcrypt");
const { db } = require("../models/user");
const { otpExpiresIn } = require("../constants");
const date = require("joi/lib/types/date");
module.exports = {
    register: async (req, res) => { // write register function and 
        try {
            let CheckUserEmail = await userManagementModel.findOne({ email: req.body.email });
            if (CheckUserEmail) return SendResponse(res, Boom.conflict("email is already exists"))
            let user = new userManagementModel(req.body);
            if (req.files != null) {
                if (req.files.image) {
                    // helper function use for image upload
                    data = await FileUpload.userImageUpload(req.files.image);
                    user.image = data;
                }
            }
            //  user.password=user.hash(user.password)
            //to store collection in databse
            // generate jwt token
            user.accessToken = await jwtTokenGenerate.generateToken(user);
            await user.save();
            

            //delete user.password;
            return SendResponse(res, { userManagement: user }, "Success");
        } catch (error) {
            console.log(error);
            return SendResponse(res, Boom.badImplementation()) // error response
        }
    },

    update: async (req, res) => {
        try {
            console.log(req.body);
            const id = req.body.id
            console.log("this is from datbase" + id)
            let userDetails = await userManagementModel.findOne({ _id: id })
            // // update query 
            // if (req.files != null) {
            //     if (req.files.image) {
            //         // helper function use for image upload
            //         data = await FileUpload.userImageUpload(req.files.image);
            //         req.body.image = data;
            //     }
            // }

            await userManagementModel.updateOne({
                _id: id
            }, req.body, { new: true })

            //select data from database
            const userDetail = await userManagementModel.findOne({
                _id: id
            }, { token: 0, createdAt: 0, updatedAt: 0, _v: 0 })

            //resposne
            return SendResponse(res, { user: userDetails }, "success");

        } catch (err) {
            console.log(err);
            return SendResponse(res, Boom.badImplementation());
        }
    },

    //for status updation 
    statusUpdate: async (req, res) => {
        try {
            // let id = await userManagementModel.findOne({ id: req.body.id })
            // if (emailexist) return SendResponse(res, Boom.conflict("Email exist"))


            const id = req.body.id
            // update query 
            // if (req.files != null) {
            //     if (req.files.image) {
            //         // helper function use for image upload
            //         data = await FileUpload.userImageUpload(req.files.image);
            //         req.body.image = data;
            //     }
            // }

            await userManagementModel.updateOne({
                _id: ObjectId(id)
            },
                {
                    $set:
                    {
                        status: req.body.status
                    }
                }
            )
            //select data from database
            const statusDetail = await userManagementModel.findOne({
                _id: ObjectId(id)
            }, { token: 0, createdAt: 0, updatedAt: 0, _v: 0 })

            //resposne
            return SendResponse(res, { statusDetails: statusDetail }, "success");

        } catch (err) {
            console.log(err);
            return SendResponse(res, Boom.badImplementation());
        }
    },

    /*For get the Data */

    getAllData: async (req, res) => {
        try {
        

            let {name,status,search = "",page=1,limit=4,skipIndex=0} = req.query
            console.log('s=============================',search);
            console.log("page no is",page);

            let params ={isDeleted:false}
            if(name){
                params=Object.assign(params,{name:name})
            }
            if(status)    //assign/add query under object
            {
                params=Object.assign(params,{status:status})
            }
            if(search)    //for searching
            {
                params=Object.assign(params,{
                name:{$regex:".*" + search + ".*",$options: "i"}
                })
            }
            
            console.log('params===========',params);
                //  const page = req.query.page ? parseInt(req.query.page):parseInt(1);
                //  const limit = req.query.limit ? parseInt(req.query.limit):parseInt(10);
                skipIndex = parseInt((page -1)*skipIndex);
                //skipIndex+=limit;
                console.log("skipindex-----",skipIndex);   
        
                 const TotalUsers = await userManagementModel.countDocuments(params).limit(limit)
                 console.log("total data",TotalUsers);
                 const userList = await userManagementModel
                 .find(params,{accesstoken:0,createdAt:0,updateAt:0,_v:0}).limit(limit).skip(skipIndex)
                
                 console.log(params);
                //  return SendResponse(res,{total: TotalUsers,user:userList},"success")
                userList.forEach((v, i) => userList[i].image = BASE_URL + "/" + userList[i].image)
              //  console.log("total users are : ",TotalUsers,"  count = ",userList.length)
            return SendResponse(res, {total: TotalUsers, allData: userList }, "Success");
            
        /*-----------------------------for pagination--------------------------- */
       



/*---------------------------------------------------------------------------------- */

        } catch (error) {
            console.log(error);
            return SendResponse(res, Boom.badImplementation())
        }
    },

    getById: async (req, res) => {
        try {
           
             const byId = await userManagementModel.findOne({ _id: ObjectId(req.body.id)
            }, { token: 0, createdAt: 0, updatedAt: 0, _v: 0 })

            //resposne
            return SendResponse(res, { byId: byId }, "success");

        } catch (err) {
            console.log(err);
            return SendResponse(res, Boom.badImplementation());
        }
    },
    delete:async(req,res)=>
    {
       console.log(req.body);
        try {
            
            const id = req.body.id
          

            const statusDetail = await userManagementModel.findOneAndUpdate({
                _id: ObjectId(id)
            },
                {
                    $set:
                    {
                        isDeleted: true
                    }
                },
                {new: true}
            )
            // //select data from database
            // const statusDetail = await userManagementModel.findOne({
            //     _id: ObjectId(id)
            // }, { token: 0, createdAt: 0, updatedAt: 0, _v: 0 })

            //resposne
            return SendResponse(res, { statusDetails: statusDetail }, "success");

        } catch (err) {
            console.log(err);
            return SendResponse(res, Boom.badImplementation());
        }
    }

}