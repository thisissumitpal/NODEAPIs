//const masterController = require("../../controllers/master"); // call controller files
const router = require("express").Router(); // call routes functions
const validator = require("../../validators/validator") // call validatore 
const checkAuthAdmin = require("../../middleware/check-auth-admin");
const userCollegeValidator = require("../../validators/userCollege.validator") // call user validatore
const userCollegeControllers = require("../../controllers/userCollege"); // call controller files
// this is a validator function which is define under validators/validator folder file
const RequestValidator = validator(false, userCollegeValidator)

//router.post("/college/register", RequestValidator, collegeControllers.register) // define users routes
router.post("/user/college/save", RequestValidator, userCollegeControllers.userCollegeDataSave) // define usercollege
router.get("/college/list", RequestValidator, userCollegeControllers.dataList)
module.exports = router;