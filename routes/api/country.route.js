//const masterController = require("../../controllers/master"); // call controller files
const router = require("express").Router(); // call routes functions
const validator = require("../../validators/validator") // call validatore 
const checkAuthAdmin = require("../../middleware/check-auth-admin");
const countryValidator = require("../../validators/country.validator") // call user validatore
const countryControllers = require("../../controllers/country"); // call controller files
// this is a validator function which is define under validators/validator folder file
const RequestValidator = validator(false, countryValidator)

//router.post("/college/register", RequestValidator, collegeControllers.register) // define users routes
router.post("/country/register",  countryControllers.countrydata) // define users routes
router.get("/country/get",countryControllers.countryList)
module.exports = router;