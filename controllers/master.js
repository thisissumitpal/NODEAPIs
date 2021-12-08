const sendResponse= require("../apiHandler");
module.exports ={

        country:(req,res) =>{
                try {
                        const arr=[
                            {
                            id:1,
                            name:"INDIA",

                            },
                            {
                                id:2,
                                name:"USA",
                            
                            }
                        ]
                        return sendResponse(res,{ total:arr.length,country:arr},"success");
                } catch(err){

                     return sendResponse(res,"error");
                }
        }
}