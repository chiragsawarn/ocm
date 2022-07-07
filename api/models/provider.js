const mongoose = require('mongoose')
const organizationSchema = require('./organization')

const providerSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    speciality:{
        type: String,
        required:true
    },
    organization:{
        type:mongoose.Schema.Types.ObjectId,
        ref:organizationSchema,
        required:true,
    },
    gender:{
        type: String,
        required:true
    },
    
})

module.exports = mongoose.model('provider',providerSchema);