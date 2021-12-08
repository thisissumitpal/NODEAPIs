// const router = require("express").Router(); // call routes functions
// const validator = require("../../validators/validator") // call validatore 
// const checkAuthAdmin = require("../../middleware/check-auth-admin");
 const userManagementValidator = require("../../validators/userManagement.validator") // call user validatore
const userManagementControllers = require("../../controllers/userManagement"); // call controller files
// // this is a validator function which is define under validators/validator folder file
// const RequestValidator = validator(false,userManagementValidator )

const masterController = require("../../controllers/master"); // call controller files
const router = require("express").Router(); // call routes functions
const checkAuthUser = require("../../middleware/check-authenticated");
const checkAuthAdmin = require("../../middleware/check-auth-admin");
const validator = require("../../validators/validator") // call validatore 
const secureRouterUser = require("express").Router(); // call routes functions
const secureRouterAdmin = require("express").Router(); // call routes functions

const userValidator = require("../../validators/users.validator") // call user validatore
const userControllers = require("../../controllers/users"); // call controller files
// this is a validator function which is define under validators/validator folder file
const RequestValidator = validator(false, userValidator)


//router.post("/college/register", RequestValidator, collegeControllers.register) // define users routes
router.post("/userManagement/register", RequestValidator, userManagementControllers.register) // define users routes

router.post("/updateAll", userManagementControllers.update)
//router.use('/user', checkAuthUser, secureRouterUser);


router.post("/statusUpdate", RequestValidator, userManagementControllers.statusUpdate)
// router.use('/user', checkAuthUser, secureRouterUser);



router.get("/data/getAllData",userManagementControllers.getAllData)


router.post("/data/getById",userManagementControllers.getById)
router.post("/data/isDeleted",userManagementControllers.delete)


module.exports = router;