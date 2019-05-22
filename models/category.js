var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});
var ObjectModel = mongoose.model('categories', Schema);
module.exports = ObjectModel;