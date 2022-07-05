const mongoose = require('mongoose')
const insuranceSchema = require('./insurance')

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    insurance:{
        type:mongoose.Schema.Types.ObjectId,
        ref:insuranceSchema,
        required:false,
    },
    encounters:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:encounterSchema,
        required:false,
    }],
})

module.exports = mongoose.model('patient',patientSchema);