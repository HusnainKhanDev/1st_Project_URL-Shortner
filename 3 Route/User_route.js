const userController = require("../2 Controller/User_Ctrl")
//this are user routes for signup signin
module.exports = (app)=>{
    app.post("/api/create/newuser", userController.signup)

    app.post("/api/signin/user", userController.signin)

}