const {Router} = require("express");
const { readTask, createTask, updateTask, deleteTask } = require("../controllers/task.controller");

const taskRoute = Router();
taskRoute.get('/read', readTask);
taskRoute.post('/create', createTask);
taskRoute.patch('/update/:id', updateTask);
taskRoute.delete('/delete/:id', deleteTask);

module.exports = taskRoute;