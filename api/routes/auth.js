const express = require('express')
const { request } = require('https')
const router = express.Router()
const PatientAuth = require('../models/auth/patientAuth')
const ProviderAuth = require('../models/auth/providerAuth')

// Get all
router.get('/', async (req,res)=>{
    try{
        if(req.body.type == 'patient'){
            const user = await PatientAuth.find({
                userId:req.body.userId,
                password:req.body.password
            }).limit(1)
            res.json(user)
        }else if(req.body.type == 'provider'){
            const user = await ProviderAuth.find({
                userId:req.body.userId,
                password:req.body.password
            }).limit(1)
            res.json(user)
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Get one
router.get('/:id', getUser, (req,res)=>{
    res.send(res.user.name)
})

// Create one
router.post('/',async (req,res)=>{
    const user = new Task({
        userId:req.body.userId,
        password:req.body.password,
        type:req.body.type,
    })
    try{
        const newTask = await user.save()
        res.status(201).json(newTask)
    }catch(err){
        // 400 means something wrong with user input
        res.status(400).json({message:err.message})
    } 
})

// Update one
// we use patch, not put because we only want to update what the user wants to update specifically. Not the entire thing
router.patch('/:id',getUser, async (req,res)=>{
    // Agar user ne naam bta rakkha hai, matlab naam update karna hoga
    if(req.body.name != null){
        res.user.name = req.body.name
    }
    if(req.body.frequency != null){
        res.user.frequency = req.body.frequency
    }
    if(req.body.startTime != null){
        res.user.startTime = req.body.startTime
    }
    if(req.body.durationHours != null){
        res.user.durationHours = req.body.durationHours
    }
    if(req.body.durationMinutes != null){
        res.user.durationMinutes = req.body.durationMinutes
    }
    if(req.body.type != null){
        res.user.type = req.body.type
    }
    if(req.body.subusers != null){
        res.user.subusers = req.body.subusers
    }
    if(req.body.weekdays != null){
        res.user.weekdays = req.body.weekdays
    }
    if(req.body.monthdays != null){
        res.user.monthdays = req.body.monthdays
    }
    try{
        const updatedTask = await res.user.save()
        res.json(updatedTask)
    }catch (err){
        res.status(400).json({message:"Couldn't update user!"});
    }
})

router.delete('/:id', getUser, async (req,res)=>{
    try{
        await res.user.remove()
        res.json({message:"Deleted Task!"})
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// middleware : to do id based searches
async function getUser(req, res, next){
    let user
    try{
        user = await PatientAuth.findById(req.params.id)
        if(user == null)
            user = await ProviderAuth.findById(req.params.id)
        if(user == null)
            return res.status(404).json({message:'Cannot find user'})
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.user = user
    next()
}

module.exports = router