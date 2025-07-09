const userSchema = require("../1 Model/User_Model")
const {v4: uuidv4} = require("uuid") // it is the module whihc create the unique id for cookies for authentication
const SetSessionID = require("../SessionID_Service")//this is middleware which read write file to store cookies ids

const signup = async (req, res)=>{
    let newUser = {
        name: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    try{
        let CreatedUser = await userSchema.create(newUser)

        if(!CreatedUser){
            return res.status(500).send({mesage: "New User is Not Created"})
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({mesage: "Error while Creating User"})
    }
    // after successful signup it render signin page 
    return res.status(200).render("Signin")
}


const signin = async (req, res) =>{

    let findUser;
    try{
        findUser = await userSchema.findOne({email: req.body.email})
        //here we are checking that user user is present or not in database
        if(!findUser){
            return res.status(400).render("Signin", {msg: "Email is not valid"});
        }
        //compairing password
        if(findUser.password != req.body.password){
            return res.status(400).render("Signin", {msg: "Password is not valid"});
        }
    }
    catch(err){
        return res.status(500).render("Signin", {msg: "Sign in failed try later"});

    }

    const sessionID = uuidv4() // generating unique id for cookies
    res.cookie("uid", sessionID) // seting up cookie with key uid and asinging unique id 
    SetSessionID.setId(sessionID, findUser._id) // here we registering user signin in JSON file with help of service giving it session id and object id from database
    res.status(200).redirect("/home"); // redirecting it to home page
}


module.exports = {
    signup: signup,
    signin:signin
}