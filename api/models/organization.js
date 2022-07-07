const mongoose = require('mongoose')

const organizationSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    state:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    },
    revenue:{
        type: Number,
        required:true
    },
})

module.exports = mongoose.model('organization',organizationSchema);