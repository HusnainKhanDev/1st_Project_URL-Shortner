const mongoose = require("mongoose")

let ShortnerSchema = new mongoose.Schema({
    shortid:{
        type: String,
        required: true,
        unique: true

    },
    originalURL:{
        type: String,
        required: true,
    },
    visitHistory: [{time: {type: Number}}],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
},{versionKey:false, timestamps: true})

module.exports = mongoose.model("url", ShortnerSchema)
