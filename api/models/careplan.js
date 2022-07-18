const mongoose = require('mongoose')
const diseaseSchema = require('./disease')

const careplanSchema = new mongoose.Schema({
    DISEASE:{
        type:mongoose.Schema.Types.ObjectId,
        ref:diseaseSchema,
        required:true,
    },
    DESIREDOUTCOME:{
        type:String,
        required:true
    },
    NURSINGINTERVENTION:{
        type:String,
        required:true,
    },
    THERAPEUTICINTERVENTION:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model('careplan',careplanSchema);