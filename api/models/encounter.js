const mongoose = require('mongoose')
const patientSchema = require('./patient')
const providerSchema = require('./provider')
const careplanSchema = require('./careplan')

const encounterSchema = new mongoose.Schema({
    start:{
        type: Date,
        default:Date(),
    },
    end:{
        type: Date,
        required:false
    },
    class:{
        type: String,
        enum:['inpatient','outpatient','ambulatory','wellness'],
        default:'outpatient',
    },
    // patient:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:patientSchema,
    //     required:true,
    // },
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:providerSchema,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    careplan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:careplanSchema,
        required:false,
    }
})

module.exports = mongoose.model('encounter',encounterSchema);