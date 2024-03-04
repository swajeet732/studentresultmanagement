// models/studentPassFailModel.js
const mongoose = require('mongoose');

const studentPassFailSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  isPass: {
    type: Boolean,
    default: false,
  },
  remarks: String,
},
{
  timestamps: true,
});

const StudentPassFail = mongoose.model('StudentPassFail', studentPassFailSchema);

module.exports = StudentPassFail;
