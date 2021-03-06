const mongoose = require('mongoose')
const providerSchema = require('./provider')

const networkSchema = new mongoose.Schema({
    PROVIDERS:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:providerSchema,
        required:true,
    }],
})

module.exports = mongoose.model('network',networkSchema);