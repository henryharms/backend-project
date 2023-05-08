// grab the things we need
// this is the menu the schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
    // Simple declaration of datatype that will be used:
    displayMode:{
        type: String,
        enum: ['light','dark']
    },
    sound: Boolean,
    language:{
        type: String,
        enum: ['English']
    }

});


// create a schema
const PlayerSchema = new Schema({
    // Simple declaration of datatype that will be used:
    name:String,

    totalClicks: Number,

    clicksPerSecond: Number,

    timeSinceClick: Number,

    settings:{
        type:SettingSchema
    },

});




module.exports = mongoose.model("Settings", SettingSchema);
module.exports = mongoose.model("PlayerData", PlayerSchema);