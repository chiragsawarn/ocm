const mongoose = require('mongoose')
const organizationSchema = require('./organization')

const providerSchema = new mongoose.Schema({
    NAME:{
        type: String,
        required:true
    },
    SPECIALITY:{
        type: String,
        required:true
    },
    ORGANIZATION:{
        type:mongoose.Schema.Types.ObjectId,
        ref:organizationSchema,
        required:true,
    },
    GENDER:{
        type: String,
        required:true
    },
    
})

module.exports = mongoose.model('provider',providerSchema);