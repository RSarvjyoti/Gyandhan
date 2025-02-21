const Task = require("../models/task.model");

const createTask = async (req, res) => {
    const {title, description, priority, dueDate} = req.body;
    try{
        const task = await Task.create({
            title,
            description,
            priority,
            dueDate
        })

        res.status(201).send({
            message : "Task created.",
            task
        })
    }catch(err) {
        res.status(500).send({
            message : "Something wend wrong.", err
        })
    }
}


const readTask = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).send({
            task : tasks
        })
    }catch(err) {
        res.status(500).send({
            message : "Something wend wrong.", err
        })
    }
}

const updateTask = async (req, res) => {
    try{
        await Task.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({
            message : "Your task is updated."
        })
    }catch(err) {
        res.status(500).send({
            message : "Something wend wrong.", err
        })
    }
}


const deleteTask = async (req, res) => {
    try{
        await Task.findOneAndDelete(req.params.id);
        res.status(200).send({
            message : "Your task deleted."
        })
    }catch(err) {
        res.status(500).send({
            message : "Something wend wrong.", err
        })
    }
}

module.exports = {createTask, readTask, updateTask, deleteTask};