const mongoose = require('mongoose')
const careplanSchema = require('./careplan')


const diseaseSchema = new mongoose.Schema({
    symptoms:{
        type:Array,
        default:[]
    },
    description:{
        type:String,
        required:true,
    },
    reason:{
        type:String,
        required:true
    },
    careplan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:careplanSchema,
        required:false,
    },
})

module.exports = mongoose.model('disease',diseaseSchema);