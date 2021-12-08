const Boom = require("boom"); //for use response formating
const fs = require("fs");
const userModel = require("../models/user");
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
             let CheckUserEmail = await userModel.findOne({email:req.body.email});
             if (CheckUserEmail) return SendResponse(res,Boom.conflict("email is already exists"))
             let user = new userModel(req.body);
             user.password=user.hash(user.password)
                      await user.save();   //to store collection in databse
                      // generate jwt token
                         user.accessToken = await jwtTokenGenerate.generateToken(user);
        delete user.password;
        return SendResponse(res,{user: user},"Success");
        } catch (error) {
            console.log(error);
            return SendResponse(res, Boom.badImplementation()) // error response
        }
    },
    


     userlist: async (req,res)=>{
    try{
//     let userlist = await userModel.find();
//  return SendResponse(res,{userlist: userlist},"success")
    let {name,role,page=1,limit=10} = req.query
    let params ={}
    if(name){
        params=Object.assign(params,{name:name})
    }
    if(role)    //assign/add query under object
    {
        params=Object.assign(params,{role:role})
    }
        //  const page = req.query.page ? parseInt(req.query.page):parseInt(1);
        //  const limit = req.query.limit ? parseInt(req.query.limit):parseInt(10);
         const skipIndex = (page -1) * limit;


         const TotalUsers = await userModel.countDocuments(params).limit(limit)
         .skip(skipIndex);
         const userList = await userModel
         .find(params,{accesstoken:0,createdAt:0,updateAt:0,_v:0})
         .limit(limit)
         .skip(skipIndex)
         return SendResponse(res,{total: TotalUsers,user:userList},"success")
} catch(error){
    console.log(error);
            return SendResponse(res, Boom.badImplementation())
}

},
login : async(req,res)=> {
    try {

        // check email from collection field
        const user = await userModel.findOne({ email: req.body.email })

        // if email not found
        if (!user) return SendResponse(res, Boom.conflict("Email not found"))

        // if password is incorrect
        if (! await user.passwordVerify(req.body.password)) return SendResponse(res, Boom.conflict("Incorrect password"))

        // heper function to use generate token
        user.accessToken = await jwtTokenGenerate.generateToken(user);
        // update jwt token in user collection after login
        // await userModel.findOneAndUpdate(
        //     { _id: user._id },
        //     { $set: { token: user.token } },
        //     { new: true }
        // );
        return SendResponse(res, { user: user }, "login successfully");

    } catch (err) {
        // console.log(err);
        return SendResponse(res, Boom.badImplementation());
    }
},
update: async (req, res) => {
    try {
        console.log(req.body);
        const id = req.userData._id
        // update query 
        if (req.files != null) {
            if (req.files.image) {
                // helper function use for image upload
                data = await FileUpload.userImageUpload(req.files.image);
                req.body.image = data;
            }
        }

        await userModel.updateOne({ _id: ObjectId(id)
}, req.body, { upsert: true })

        //select data from database
        const userDetail = await userModel.findOne({ _id: ObjectId(id)
}, { token: 0, createdAt: 0, updatedAt: 0, _v: 0 })

        //resposne
        return SendResponse(res, { user: userDetail }, "success");

    } catch (err) {
        console.log(err);
        return SendResponse(res, Boom.badImplementation());
    }
},

                       //for email updation 
                       emailUpdate: async (req, res) => {
                        try {
                            let emailexist=   await userModel.findOne({email:req.body.email})
                            if(emailexist) return SendResponse(res, Boom.conflict("Email exist"))
                            
                            
                            const id = req.userData._id
                            // update query 
                            // if (req.files != null) {
                            //     if (req.files.image) {
                            //         // helper function use for image upload
                            //         data = await FileUpload.userImageUpload(req.files.image);
                            //         req.body.image = data;
                            //     }
                            // }
                    
                         let emailUpdate=   await userModel.updateOne({ _id: ObjectId(id)
                    }, req.body, { upsert: true })
                    
                            //select data from database
                    //         const userDetail = await userModel.findOne({ _id: ObjectId(id)
                    // }, { token: 0, createdAt: 0, updatedAt: 0, _v: 0 })
                    
                            //resposne
                            return SendResponse(res, { emailUpdate: emailUpdate }, "success");
                    
                        } catch (err) {
                            console.log(err);
                            return SendResponse(res, Boom.badImplementation());
                        }
                    },
                    


                    //for password updation
        



                    passwordUpdate: async (req, res) => {
                        try {
              
                             let old_password=req.body.oldpassword;
                           // let new_password= req.body.newpassword;
                            let db_password = req.userData.password;    //used for taking the value from collection
                            let id=req.userData._id;      //taking the id from the data
                            let user = new userModel(req.body);  
                            user.password = user.hash(user.password);    //used for encrypt the password
                            
                           console.log("body old pass "+ old_password)
                          // console.log("body new pass "+ new_password)
                           console.log("collection old pass "+ db_password)
                        
                            
                            let compare =await  bcrypt.compare(old_password,db_password)
                            console.log(compare)
                            if(compare)
                            {
                                
                                await userModel.updateOne({_id:id},{$set:{password:user.password}})

                            let userList = await userModel.find()
                                return SendResponse(res, {userList:userList }, "updated"); 
                            }
                            else{
                                return SendResponse(res, { }, "incorrect password");
                            }
                              
                    
                        } catch (err) {
                            console.log(err);
                            return SendResponse(res, Boom.badImplementation());
                        }
                    },


/*----------------------------------------------------------------------------------------------------------------- */

                                   //forget password


    forgetPassword:async(req,res) =>{
        try{
            const user = await userModel.findOne({ email: req.body.email })
           
            const checkotp = await otpModel.findOne({email: req.body.email}) //used to check email is exists or not in otp model
            if(checkotp) return SendResponse(res,Boom.conflict("Otp has been created"))
            
            if (user)
            {
                    let otp=Math.floor((Math.random()*10000)+1);
                    console.log(otp);
                    let otpData =({
                        email:req.body.email,
                        otp:otp
                        
                        
                    })
                    let otpResponse = new otpModel(otpData);
                    await otpResponse.save();
                    return SendResponse(res,{otpResponse:otpResponse},"Success");
                    
            }else
            {
                return SendResponse(res, Boom.conflict("Email not found"))   
            }
            
            
            

        }catch (err) {
            console.log(err);
            return SendResponse(res, Boom.badImplementation());
        }
    },
    /*------------------------------------------------------------------------------------------------------------- */

    CHangePAssword:async(req,res) =>{
        let data = await otpModel.find({email:req.body.email,otp:req.body.otp},{_id:1});
        
    //     let user = new userModel(req.body);
    //   user.password = user.hash(user.password); 
        console.log(data[0]=="")
        if(data[0]==null)


        {
            console.log("data is blank")
            return SendResponse(res, { }, "please check your email/otp"); 
            
             
        }else {
            console.log("inside the if block   ")
            let user = await userModel.findOne({email:req.body.email})
            user.password=user.hash(user.password);
            const time = await otpModel.findOne({email:req.body.email},{createdAt:1,_id:0}) 
            let createdTime = new Date(time.createdAt);
            console.log("This is created time "+createdTime.toString());
            let currentTime = new Date();
            console.log("this is current time"+currentTime.toString);
            const otpExpire=currentTime.getTime()-createdTime.getTime();
            if(otpExpire>60000)
            {
                await otpModel.deleteOne({email:req.body.email});
                return SendResponse(res,"Otp Expire")
            }
            //user.save();
            await userModel.updateOne({email:req.body.email},{$set:{password:user.password}})
            await otpModel.deleteOne({email:req.body.email})
            let userList = await userModel.find({email:req.body.email})
            return SendResponse(res, {userList:userList }, "updated");
        }
    },



/*------------------------------------------------------------------------------------------------------------------ */

detail: async (req, res) => {
    try {
        // console.log(req.userData);
        const _id = req.userData._id // user login data

        if (!ObjectId.isValid(id)) { // check if not valid id which is send by user
            return SendResponse(res, Boom.conflict("invalid id"));
        }

        // select data from database
        const userDetail = await userModel.findOne({ id: ObjectId(id)
}, { token: 0, createdAt: 0, updatedAt: 0, _v: 0 })

        //check if nullable userdetail
        if (!userDetail) return SendResponse(res, { user: {} }, "success");

        // resposne
        return SendResponse(res, { user: userDetail }, "success");

    } catch (err) {
        // console.log(err);
        return SendResponse(res, Boom.badImplementation());
    }
}
       

    }
