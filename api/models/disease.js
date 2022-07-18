const mongoose = require('mongoose')
const careplanSchema = require('./careplan')


const diseaseSchema = new mongoose.Schema({
    SYMPTOMS:{
        type:Array,
        default:[]
    },
    DESCRIPTION:{
        type:String,
        required:true,
    },
    REASON:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('disease',diseaseSchema);