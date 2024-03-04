// controller/studentAggregateController.js
const mongoose = require('mongoose');

const Student = require('../models/studentmodel');
const FeeModel = require('../models/studentFeesModel');
const StudentPassFail = require('../models/studentPassFailModel');

exports.aggregateStudentData = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { name: studentName } = req.query;

    const studentData = await Student.aggregate([
      {
        $match: {
          name: { $regex: new RegExp(studentName, 'i') },
          _id: new mongoose.Types.ObjectId(studentId),
        },
      },
      {
        $lookup: {
          from: 'studentpassfails',
          localField: '_id',
          foreignField: 'studentId',
          as: 'passFailData',
        },
      },
      {
        $unwind: {
          path: '$passFailData',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'transactions',
          localField: '_id',
          foreignField: 'userId',
          as: 'feeData',
        },
      },
      {
        $unwind: {
          path: '$feeData',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          marks: 1,
          passFailData: {
            isPass: '$passFailData.isPass',
            remarks: '$passFailData.remarks',
          },
          feeData: {
            amount: '$feeData.amount',
            date: '$feeData.date',
            status: '$feeData.status',
          },
        },
      },
    ]);

    if (!studentData || studentData.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Return the student data to the frontend
    return res.json(studentData[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
