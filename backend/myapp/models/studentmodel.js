// models/studentModel.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  marks: {
    type: Map, // Using Map to store dynamic subject marks
    of: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
