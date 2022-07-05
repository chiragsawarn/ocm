const mongoose = require('mongoose')

const encounterSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    
})

module.exports = mongoose.model('encounter',encounterSchema);