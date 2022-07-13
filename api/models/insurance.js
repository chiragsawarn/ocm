const mongoose = require('mongoose')
const providerSchema = require('./provider')
const networkSchema = require('./network')


const insuranceSchema = new mongoose.Schema({
    insurer:{
        type: String,
        required:true
    },
    subscriber:{
        type:String,
        required:true
    },
    stateOfGeographicalValidity:{
        type:String,
        required:true,
    },
    pcp:{
        type:mongoose.Schema.Types.ObjectId,
        ref:providerSchema,
        required:false,
    },
    network:{
        type:mongoose.Schema.Types.ObjectId,
        ref:networkSchema,
        required:false,
    },
    coveredMemebers:{
        type:String,
        required:true,
    },
    maximum:{
        type:Number,
        required:true,
    },
    deductible:{
        type:Number,
        required:true,
    },
    copayment:{
        type:Number,
        required:true,
    },
})

module.exports = mongoose.model('insurance',insuranceSchema);