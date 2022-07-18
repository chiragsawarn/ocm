const express = require('express')
const { request } = require('https')
const router = express.Router()
const Encounter = require('../models/encounter')
const Patient = require('../models/patient')

// Get all
router.post('/ofProvider', async (req,res)=>{
    try{
        const e = await Encounter.find({
            PROVIDER:req.body.PROVIDER
        }).populate({
            path:'PROVIDER',
            populate:[{
                path:'ORGANIZATION',
                // populate:[{
                //     path:'PCP',
                // }]
            }]
        })
        res.json(e);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Get one
router.get('/:id', getEncounter, (req,res)=>{
    res.send(res.encounter.START)
})

// Create one
router.post('/add',async (req,res)=>{
    const e = new Encounter({
        START:req.body.START,
        END:req.body.END,
        CLASS:req.body.CLASS,
        PROVIDER:req.body.PROVIDER,
    })
    try{
        const newEncounter = await e.save()
        const patient = await Patient.findById(req.body.PATIENT)
        patient.ENCOUNTERS.push(newEncounter._id);
        await patient.save();
        res.status(201).json(newEncounter)
    }catch(err){
        // 400 means something wrong with encounter input
        res.status(400).json({message:err.message})
    } 
})

// Update one
// we use patch, not put because we only want to update what the user wants to update specifically. Not the entire thing
router.patch('/:id',getEncounter, async (req,res)=>{
    // Agar encounter ne naam bta rakkha hai, matlab naam update karna hoga
    if(req.body.START != null){
        res.encounter.START = req.body.START
    }
    if(req.body.END != null){
        res.encounter.END = req.body.END
    }
    
    try{
        const updatedEncounter = await res.encounter.save()
        res.json(updatedEncounter)
    }catch (err){
        res.status(400).json({message:"Couldn't update user!"});
    }
})

router.delete('/:id', getEncounter, async (req,res)=>{
    try{
        await res.encounter.remove()
        res.json({message:"Deleted Encounter!"})
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// middleware : to do id based searches
async function getEncounter(req, res, next){
    let encounter
    try{
        encounter = await Encounter.findById(req.params.id)
        if(encounter == null)
            return res.status(404).json({message:'Cannot find encounter'})
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.encounter = encounter
    next()
}

module.exports = router