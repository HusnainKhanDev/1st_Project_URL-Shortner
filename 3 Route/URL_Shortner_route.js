let URLController = require("../2 Controller/URL_Shortner_Ctrl")
let USERMW = require("../MiddleWare/User_Auth")

//this is real api endpoint form where we do mainuplation
module.exports = (app) =>{
    app.post("/api/create/shorturl",USERMW.isSignin, URLController.CreateShortURL)

    app.get("/api/redirect/:shorturl", URLController.RedirectShortURL)

    app.get("/analytics", USERMW.isSignin, URLController.CountClicks);

}