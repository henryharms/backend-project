// grab the things we need
// this is the menu the schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const ClicksSchema = new Schema({
    // Simple declaration of datatype that will be used:
    value: Number,
 
    timeSinceClick: Date,

});


module.exports = mongoose.model("Clicks", ClicksSchema);
