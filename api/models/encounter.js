const mongoose = require('mongoose')
const providerSchema = require('./provider')
const careplanSchema = require('./careplan')

const encounterSchema = new mongoose.Schema({
    START:{
        type: Date,
        default:Date(),
    },
    END:{
        type: Date,
        required:false
    },
    CLASS:{
        type: String,
        enum:['inpatient','outpatient','ambulatory','wellness'],
        default:'outpatient',
    },
    PROVIDER:{
        type:mongoose.Schema.Types.ObjectId,
        ref:providerSchema,
        required:true,
    },
    DESCRIPTION:{
        type:String,
        required:false
    },
    REASON:{
        type:String,
        required:false
    },
    CAREPLAN:{
        type:mongoose.Schema.Types.ObjectId,
        ref:careplanSchema,
        required:false,
    }
})

module.exports = mongoose.model('encounter',encounterSchema);