const mongoose = require('mongoose')
const providerSchema = require('../provider')

const providerAuthSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    password:{
        type:Number,
        required:true
    },
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:providerSchema,
        required:false,
    },
})

module.exports = mongoose.model('providerAuth',providerAuthSchema);