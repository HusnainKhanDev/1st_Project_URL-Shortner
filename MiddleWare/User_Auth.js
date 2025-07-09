const SetSessionID = require("../SessionID_Service")
// here we are checking user is loged in or not 
let isSignin = (req,res,next) => {
    if(!req.cookies.uid){// retriving uid from cookies
        return res.redirect("/signin")// if not found sending user again to login page
    }

    let checkUser= SetSessionID.getid(req.cookies.uid)// if found checking uid is authentic or not by comaparing it from uid in json file
   
    if(!checkUser){//if it return nothing again sending to logoin page
        return res.redirect("/signin")
    }
    //This getid function returns ObjectId of person 
    req.userObjID = checkUser // if id found in json file attaching it with request
    next()

}

module.exports = {
    isSignin:isSignin
}