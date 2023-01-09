
const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const dataSchema = new Schema({
    name: {type: String, required: true},
    data: {type: Schema.Types.Mixed, required: true},
});


module.exports = mongoose.model('Data', dataSchema);