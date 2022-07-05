const mongoose = require('mongoose')

const providerSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    
})

module.exports = mongoose.model('provider',providerSchema);