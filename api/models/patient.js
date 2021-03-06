const mongoose = require('mongoose')
const insuranceSchema = require('./insurance')
const encounterSchema = require('./encounter')

const patientSchema = new mongoose.Schema({
    NAME:{
        type: String,
        required:true
    },
    AGE:{
        type:Number,
        required:true
    },
    INSURANCE:{
        type:mongoose.Schema.Types.ObjectId,
        ref:insuranceSchema,
        required:false,
    },
    ENCOUNTERS:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:encounterSchema,
        required:false,
    }],
})

module.exports = mongoose.model('patient',patientSchema);