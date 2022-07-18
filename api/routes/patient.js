const express = require('express')
const { request } = require('https')
const router = express.Router()
const Patient = require('../models/patient')

// Get all
router.get('/', async (req,res)=>{
    try{
        const patient = await Patient.find()
        res.json(patient)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Get one
router.get('/:id', getUser, (req,res)=>{
    res.send(res.patient)
})

router.get('/:id/encounters', getUser, (req,res)=>{
    res.send(res.patient.ENCOUNTERS)
})

// Create one
router.post('/',async (req,res)=>{
    const patient = new Patient({
        NAME:req.body.NAME,
        AGE:req.body.AGE,
        INSURANCE:req.body.INSURANCE,
        ENCOUNTERS:req.body.ENCOUNTERS
    })
    try{
        const newUser = await patient.save()
        res.status(201).json(newUser)
    }catch(err){
        // 400 means something wrong with patient input
        res.status(400).json({message:err.message})
    } 
})

// Update one
// we use patch, not put because we only want to update what the patient wants to update specifically. Not the entire thing
router.patch('/:id',getUser, async (req,res)=>{
    // Agar patient ne naam bta rakkha hai, matlab naam update karna hoga
    if(req.body.NAME != null){
        res.patient.NAME = req.body.NAME
    }
    if(req.body.AGE != null){
        res.patient.AGE = req.body.AGE
    }
    if(req.body.ENCOUNTERS != null){
        res.patient.ENCOUNTERS = req.body.ENCOUNTERS
    }
    
    try{
        const updatedUser = await res.patient.save()
        res.json(updatedUser)
    }catch (err){
        res.status(400).json({message:"Couldn't update patient!"});
    }
})

router.delete('/:id', getUser, async (req,res)=>{
    try{
        await res.patient.remove()
        res.json({message:"Deleted User!"})
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// middleware : to do id based searches
async function getUser(req, res, next){
    let patient
    try{
        patient = await Patient.findById(req.params.id).populate({
            path:'ENCOUNTERS',
            populate:[{
                path:'PROVIDER',
                populate:[{
                    path:'ORGANIZATION'
                }]
            }]
        })
        if(patient == null)
            return res.status(404).json({message:'Cannot find patient'})
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.patient = patient
    next()
}

module.exports = router