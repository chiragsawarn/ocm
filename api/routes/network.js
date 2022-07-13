const express = require('express')
const { request } = require('https')
const router = express.Router()
const Network = require('../models/network')

// Get all
router.get('/', async (req,res)=>{
    try{
        const network = await Network.find()
        res.json(network)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Get one
router.get('/:id', getUser, (req,res)=>{
    res.send(res.network.providers)
})

// Create one
router.post('/',async (req,res)=>{
    const network = new Network({
        providers:req.body.providers
    })
    try{
        const newUser = await network.save()
        res.status(201).json(newUser)
    }catch(err){
        // 400 means something wrong with network input
        res.status(400).json({message:err.message})
    } 
})

// Update one
// we use patch, not put because we only want to update what the network wants to update specifically. Not the entire thing
router.patch('/:id',getUser, async (req,res)=>{
    // Agar network ne naam bta rakkha hai, matlab naam update karna hoga
    if(req.body.providers != null){
        res.network.providers = req.body.providers
    }
    
    try{
        const updatedUser = await res.network.save()
        res.json(updatedUser)
    }catch (err){
        res.status(400).json({message:"Couldn't update network!"});
    }
})

router.delete('/:id', getUser, async (req,res)=>{
    try{
        await res.network.remove()
        res.json({message:"Deleted User!"})
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// middleware : to do id based searches
async function getUser(req, res, next){
    let network
    try{
        network = await Network.findById(req.params.id)
        if(network == null)
            return res.status(404).json({message:'Cannot find network'})
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.network = network
    next()
}

module.exports = router