const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    
    firstname: {
        type: String,
        required : true
    },
    lastname: {
        type: String,
        required : true
    }, 
    email : {
        type: String,
        required : true,
        unique : true
    },
    address : {
        type: String,
        required : true
    },
    phone : {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('Data', dataSchema)