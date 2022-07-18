const express = require('express')
const { request } = require('https')
const router = express.Router()
const Network = require('../models/network')
const Encounter = require('../models/encounter')

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
    res.send(res.network.PROVIDERS)
})

// Create one
router.post('/',async (req,res)=>{
    const network = new Network({
        PROVIDERS:req.body.PROVIDERS
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
    if(req.body.PROVIDERS != null){
        res.network.PROVIDERS = req.body.PROVIDERS
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
        network = await Network.findById(req.params.id).populate({
            path:'PROVIDERS',
            populate:[{
                path:'ORGANIZATION',
            }]
        })
        if(network == null)
            return res.status(404).json({message:'Cannot find network'})
        else{

            populateEncounters = async()=>{
                var promises = [];

                network.PROVIDERS.forEach((provider)=>{
                    promises.push(
                        (async (provider)=>{
                            const e = await Encounter.find({
                                PROVIDER:provider._id
                            })
                            return e;
                        })(provider)
                        .then((e)=>{
                            provider['ENCOUNTERS'] = e;
                            console.log(provider);
                        })
                        .catch ((error) => {
                            console.log('Error: ', error);
                        })
                    );
                });
                    
                Promise.all(promises).then(() => {
                    // console.log(network.PROVIDERS)
                    res.network = network;
                    next()
                });
            }

            await populateEncounters();
            
            // console.log(JSON.stringify(network.PROVIDERS,null,4))
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    
}

module.exports = router