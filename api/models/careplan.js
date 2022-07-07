const mongoose = require('mongoose')
const diseaseSchema = require('./disease')

const careplanSchema = new mongoose.Schema({
    disease:{
        type:mongoose.Schema.Types.ObjectId,
        ref:diseaseSchema,
        required:true,
    },
    desiredOutcome:{
        type:String,
        required:true
    },
    nursingIntervention:{
        type:String,
        required:true,
    },
    thrapeuticIntervention:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model('careplan',careplanSchema);