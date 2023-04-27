// grab the things we need
// this is the menu the schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const playerSchema = new Schema({
    // Simple declaration of datatype that will be used:
    name:{type:String, unique:true},

    totalClicks: Number,

    clicksPerSecond: Number,

    timeSinceClick: Date,

});


module.exports = mongoose.model("PlayerData", playerSchema);
