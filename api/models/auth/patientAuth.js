const mongoose = require('mongoose')
const patientSchema = require('../patient')

const patientAuthSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    password:{
        type:Number,
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:patientSchema,
        required:true,
    },
})

module.exports = mongoose.model('patientAuth',patientAuthSchema);