const mongoose = require('mongoose')

const organizationSchema = new mongoose.Schema({
    NAME:{
        type: String,
        required:true
    },
    ADDRESS:{
        type: String,
        required:true
    },
    CITY:{
        type: String,
        required:true
    },
    STATE:{
        type: String,
        required:true
    },
    PHONE:{
        type: String,
        required:true
    },
    REVENUE:{
        type: Number,
        required:true
    },
})

module.exports = mongoose.model('organization',organizationSchema);