//const masterController = require("../../controllers/master"); // call controller files
const router = require("express").Router(); // call routes functions
const validator = require("../../validators/validator") // call validatore 
const checkAuthAdmin = require("../../middleware/check-auth-admin");
const collegeValidator = require("../../validators/college.validator") // call user validatore
const collegeControllers = require("../../controllers/college"); // call controller files
// this is a validator function which is define under validators/validator folder file
const RequestValidator = validator(false, collegeValidator)

//router.post("/college/register", RequestValidator, collegeControllers.register) // define users routes
router.post("/college/register",checkAuthAdmin, RequestValidator, collegeControllers.register) // define users routes
module.exports = router;