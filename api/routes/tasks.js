const express = require('express')
const { request } = require('https')
const router = express.Router()
const Task = require('../models/task')

// Get all
router.get('/', async (req,res)=>{
    try{
        const tasks = await Task.find()
        res.json(tasks)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Get one
router.get('/:id', getTask, (req,res)=>{
    res.send(res.task.name)
})

// Create one
router.post('/',async (req,res)=>{
    const task = new Task({
        name:req.body.name,
        frequency:req.body.frequency,
        startTime:req.body.startTime,
        durationHours:req.body.durationHours,
        durationMinutes:req.body.durationMinutes,
        type:req.body.type,
        subtasks:req.body.subtasks,
        weekdays:req.body.weekdays,
        monthdays:req.body.monthdays,
    })
    try{
        const newTask = await task.save()
        res.status(201).json(newTask)
    }catch(err){
        // 400 means something wrong with user input
        res.status(400).json({message:err.message})
    } 
})

// Update one
// we use patch, not put because we only want to update what the user wants to update specifically. Not the entire thing
router.patch('/:id',getTask, async (req,res)=>{
    // Agar user ne naam bta rakkha hai, matlab naam update karna hoga
    if(req.body.name != null){
        res.task.name = req.body.name
    }
    if(req.body.frequency != null){
        res.task.frequency = req.body.frequency
    }
    if(req.body.startTime != null){
        res.task.startTime = req.body.startTime
    }
    if(req.body.durationHours != null){
        res.task.durationHours = req.body.durationHours
    }
    if(req.body.durationMinutes != null){
        res.task.durationMinutes = req.body.durationMinutes
    }
    if(req.body.type != null){
        res.task.type = req.body.type
    }
    if(req.body.subtasks != null){
        res.task.subtasks = req.body.subtasks
    }
    if(req.body.weekdays != null){
        res.task.weekdays = req.body.weekdays
    }
    if(req.body.monthdays != null){
        res.task.monthdays = req.body.monthdays
    }
    try{
        const updatedTask = await res.task.save()
        res.json(updatedTask)
    }catch (err){
        res.status(400).json({message:"Couldn't update task!"});
    }
})

router.delete('/:id', getTask, async (req,res)=>{
    try{
        await res.task.remove()
        res.json({message:"Deleted Task!"})
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// middleware : to do id based searches
async function getTask(req, res, next){
    let task
    try{
        task = await Task.findById(req.params.id)
        if(task == null)
            return res.status(404).json({message:'Cannot find task'})
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.task = task
    next()
}

module.exports = router