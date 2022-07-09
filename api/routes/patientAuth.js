const express = require('express')
const { request } = require('https')
const router = express.Router()
const PatientAuth = require('../models/auth/patientAuth')
const Patient = require('../models/patient')

// Get all
router.post('/login', async (req,res)=>{
    try{
        const user = await PatientAuth.find({
            userId:req.body.userId,
            password:req.body.password
        }).limit(1)
        res.json(user)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Get one
router.get('/:id', getUser, (req,res)=>{
    res.send(res.user.userId)
})

// Create one
router.post('/signup',async (req,res)=>{
    const p = new Patient({
        name:req.body.name
    })
    const user = new PatientAuth({
        userId:req.body.userId,
        password:req.body.password,
        patient:p._id,
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        // 400 means something wrong with user input
        res.status(400).json({message:err.message})
    } 
})

// Update one
// we use patch, not put because we only want to update what the user wants to update specifically. Not the entire thing
router.patch('/:id',getUser, async (req,res)=>{
    // Agar user ne naam bta rakkha hai, matlab naam update karna hoga
    if(req.body.userId != null){
        res.user.userId = req.body.userId
    }
    if(req.body.password != null){
        res.user.password = req.body.password
    }
    
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }catch (err){
        res.status(400).json({message:"Couldn't update user!"});
    }
})

router.delete('/:id', getUser, async (req,res)=>{
    try{
        await res.user.remove()
        res.json({message:"Deleted User!"})
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
            return res.status(404).json({message:'Cannot find user'})
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.user = user
    next()
}

module.exports = router