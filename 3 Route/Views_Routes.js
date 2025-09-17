// //In Routes Where you are rendiring page always USE GET METHOD TO RENDER
// //----------------------------------------------------------------------
let URLController = require("../2 Controller/URL_Shortner_Ctrl")
let USERMW = require("../MiddleWare/User_Auth")

//these are the routes used for redirecting on view pages 
module.exports = (app) => {
    
    app.get("/", (req, res) => {
        res.render("Signup");  
    });

   
    app.get("/signin", (req, res) => {
        res.render("Signin"); 
    });

    app.get("/home", USERMW.isSignin, URLController.CountClicks)
};
