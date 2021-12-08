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

router.get("/country", masterController.country) // define users routes
router.post("/user/register", RequestValidator, userControllers.register) // define users routes
router.get("/user/list", userControllers.userlist)
router.post("/forgetpassword",RequestValidator,  userControllers.forgetPassword)



router.post("/user/login", RequestValidator, userControllers.login)
//   router.post("/user/update",RequestValidator,userControllers.update)





/*Admin route validation*/

secureRouterUser.post("/update", RequestValidator, userControllers.update)
secureRouterUser.post("/emailUpdate", RequestValidator, userControllers.emailUpdate)
secureRouterUser.post("/passwordUpdate", RequestValidator, userControllers.passwordUpdate)

router.post("/changepassword", RequestValidator, userControllers.CHangePAssword)
//here
router.use('/user', checkAuthUser, secureRouterUser);

// secureRouterAdmin.get("/user/list", userControllers.userlist)  //define users userlist routes
// router.use('/admin', checkAuthAdmin, secureRouterAdmin);





module.exports = router;