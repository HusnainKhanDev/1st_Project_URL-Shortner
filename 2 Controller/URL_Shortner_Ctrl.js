let ShortnerSchema = require("../1 Model/URL_Shortner_model")
const shortid = require("shortid") // it is the exterrnal module which makes short rendom ids

let CreateShortURL_Controller = async (req, res) => {
    if (!req.body.url) {
        return res.status(400).send({ message: "URL is required" });
    }

    let newURL = {
        shortid: shortid(),
        originalURL: req.body.url,
        visitHistory: [],
        createdBy: req.userObjID
    };

    try {
        const CreatedURL = await ShortnerSchema.create(newURL);

        // Redirect to the analytics page with the new URL's shortid as a query parameter
        res.redirect(`/analytics?shortURL=${CreatedURL.shortid}`);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Error while inserting new URL" });
    }
};



let RedirectShortURL = async (req, res) => {
    let shortID = req.params.shorturl; //params use to get the data from url parameter
    console.log(shortID)
    try{
        await ShortnerSchema.updateOne({shortid: shortID}, {
            //in visitHistory field we are pushing time when shortURL is clicked
            $push: {visitHistory: {time: Date.now()}} 
        })
    }
    catch(err){
        console.log(err)
        return res.status(400).send({message: "Error While Updating"})
    }
    let entry
    try{
        entry = await ShortnerSchema.findOne({shortid: shortID})
        if(!entry){
            return res.status(404).send({message: "URL Not Found"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send({message: "Error While Updating"})
    }
    // redirect use to send client on any url here we redirecting it on original url
    res.redirect(entry.originalURL)
};

// in this controller we are making analytics of url 
let CountClicks = async (req, res) => {
    let UserObjId = req.userObjID;
    let result;

    try {
        result = await ShortnerSchema.find({ createdBy: UserObjId });
        if (!result) {
            return res.status(404).send({ message: "URL Not Found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: "Error while finding URLs" });
    }

    // Get the shortURL from the query parameters, if available
    const shortURL = req.query.shortURL || "";

    // Render analytics with the short URL (if recently created) and other data
    res.status(200).render("home", { result: result, shortURL: shortURL });
};



module.exports = {
    CreateShortURL:CreateShortURL_Controller,
    RedirectShortURL:RedirectShortURL,
    CountClicks: CountClicks
}