const mongoose = require('mongoose')

const subTaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

const taskSchema = new mongoose.Schema({
  activityName: {
    type: String,
    required: [true, 'must provide the name of the activity'],
  },
  startDate: {
    type: Date,
    required: [true, 'must start date'],
  },
  endDate: {
    type: Date,
  },
  details: {
    type: String,
  },
  subTask: [subTaskSchema]
});



exports.Task = mongoose.model('Task', taskSchema);
exports.taskSchema = taskSchema;

