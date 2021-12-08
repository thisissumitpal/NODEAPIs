// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
const usersRouter = require("./api/user.route")
const collegeRouter = require("./api/college.route")
const userCollegeRouter = require("./api/userCollege.route")
const countryRouter = require("./api/country.route")
const stateRouter = require("./api/State.route")
const cityRouter = require("./api/City.route")
const userManagementRouter=require("./api/userManagement.route");
//const studentRouter = require("./api/student.route") // import user route here
module.exports = (app) => {
   app.use("/api",userCollegeRouter)
    app.use("/api", usersRouter)
    app.use("/api", collegeRouter)
    app.use("/api", countryRouter)
    app.use("/api", stateRouter)
    app.use("/api", cityRouter)
   // app.use("/api", studentRouter) // define user routes with prefix users
   app.use("/api",userManagementRouter)
}