const mongoose = require('mongoose')
const patientSchema = require('../patient')

const patientAuthSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:patientSchema,
        required:false,
    },
})

module.exports = mongoose.model('patientAuth',patientAuthSchema);