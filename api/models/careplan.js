const mongoose = require('mongoose')
const patientSchema = require('./patient')

const careplanSchema = new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:patientSchema,
        required:true,
    },
    frequency:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true,
    },
    endTime:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model('careplan',careplanSchema);