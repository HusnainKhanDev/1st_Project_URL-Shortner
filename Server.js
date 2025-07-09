//Dependencies---------------------------------------------------------------------------
const express = require("express")
const ejs = require("ejs") // this is a external module help to render html page
const cookieParser = require('cookie-parser');
const path = require('path'); //this module help in defining the path of any directory
const mongoose = require("mongoose")
const app = express()

//Server---------------------------------------------------------------------------------
const PORT = 8484
app.listen(PORT, ()=>{
    console.log(`Server Started on Port: ${PORT}`)
})

//Database-------------------------------------------------------------------------------
mongoose.connect("mongodb://localhost/URLShortner")
.then(()=>{
    console.log("DB Connected")
})
.catch((err)=>{
    console.log("Error While Connecting DB " + err)
})


//MiddleWare-----------------------------------------------------------------------------
app.use(express.json())
app.use(cookieParser()); // this is require to read coockies data
app.use(express.urlencoded({ extended: true })); // this is use to read form data
app.set("view engine", "ejs") // here we tell express  whihc view engine we are using
app.set('views', path.resolve("./4 Views")); // we define the path where are views files located through path module


//Routes---------------------------------------------------------------------------------
const URlRoute = require("./3 Route/URL_Shortner_route")
const Views_Route = require("./3 Route/Views_Routes")
const UserRoute = require("./3 Route/User_route")
URlRoute(app)
Views_Route(app)
UserRoute(app)


