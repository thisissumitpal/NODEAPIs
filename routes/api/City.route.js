//const masterController = require("../../controllers/master"); // call controller files
const router = require("express").Router(); // call routes functions
// const validator = require("../../validators/validator") // call validatore 
// const checkAuthAdmin = require("../../middleware/check-auth-admin");
const cityControllers = require("../../controllers/city"); // call controller files
// this is a validator function which is define under validators/validator folder file
// const RequestValidator = validator(false, cityValidator)

//router.post("/college/register", RequestValidator, collegeControllers.register) // define users routes
router.post("/city/register",  cityControllers.citydata) // define users routes
router.get("/city/get",cityControllers.getStateData)
module.exports = router;