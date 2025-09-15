const fs = require("fs");
let sessionDATA = require("./SessionData/SessionID_DATA.json"); //here retriving old data from file 


let setId = (useruuid, userid) => {
    sessionDATA.push({ uuid: useruuid, userObjID: userid }); // pushing new object in old data 

    //writing file with new data JSON.stringify() use to convert real json into json type string because json file always hold data in the form of string
    fs.writeFile("./SessionID_DATA.json", JSON.stringify(sessionDATA), (err) => {
        if (err) {
            console.log("Error while writing file", err);
        } else {
            console.log("Session data updated successfully");
        }
    });
};

// this function takes session id and find it if found return ObjectId of person associated with seccion id 
let getid = (id) =>{
    let findID = sessionDATA.find((obj) => obj.uuid === id);
    if(!findID){
        return undefined
    }

    return findID.userObjID

}


module.exports = {
    setId:setId,
    getid:getid
}

