const mongoose = require('mongoose')
const providerSchema = require('./provider')
const networkSchema = require('./network')


const insuranceSchema = new mongoose.Schema({
    INSURER:{
        type: String,
        required:true
    },
    SUBSCRIBER:{
        type:String,
        required:true
    },
    STATEOFGEOGRAPHICALVALIDITY:{
        type:String,
        required:true,
    },
    PCP:{
        type:mongoose.Schema.Types.ObjectId,
        ref:providerSchema,
        required:false,
    },
    NETWORK:{
        type:mongoose.Schema.Types.ObjectId,
        ref:networkSchema,
        required:false,
    },
    COVEREDMEMBERS:{
        type:String,
        required:true,
    },
    MAXIMUM:{
        type:Number,
        required:true,
    },
    DEDUCTIBLE:{
        type:Number,
        required:true,
    },
    COPAYMENT:{
        type:Number,
        required:true,
    },
})

module.exports = mongoose.model('insurance',insuranceSchema);