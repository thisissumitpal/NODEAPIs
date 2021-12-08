//const masterController = require("../../controllers/master"); // call controller files
const router = require("express").Router(); // call routes functions
const validator = require("../../validators/validator") // call validatore 
const StateAuthAdmin = require("../../middleware/check-auth-admin");
const StateValidator = require("../../validators/state.validator") // call user validatore
const StateControllers = require("../../controllers/state"); // call controller files
// this is a validator function which is define under validators/validator folder file

//router.post("/college/register", RequestValidator, collegeControllers.register) // define users routes
router.post("/state/register",  StateControllers.stateData) // define users routes
router.get("/state/get",StateControllers.getCountryData)
module.exports = router;