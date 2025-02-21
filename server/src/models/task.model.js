const {Schema, model} = require("mongoose");

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      priority: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true,
      },
      dueDate: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
})

const Task = model("task", taskSchema);
module.exports = Task;