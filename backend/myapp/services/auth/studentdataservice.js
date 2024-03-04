
//services/auth/studentdataservices.js
const Student = require('../../models/studentmodel');
const StudentPassFail = require('../../models/studentPassFailModel');


const addStudentDataService = async (studentData) => {
  const { name, marks } = studentData;

  try {
    const existingStudent = await Student.findOne({ name });

    if (existingStudent) {
      console.log('Student with the same name already exists');
      throw new Error('Student with the same name already exists');
    }

    const newStudent = new Student({ name, marks });
    const savedStudent = await newStudent.save();
    console.log('Student added successfully:', savedStudent);
    return savedStudent;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

const addFailStudent = async (studentId, isPass, remarks) => {
  try {
    // Assuming you have the necessary data in the request body
    // For example, the studentId, isPass, and remarks
    const newFailStudent = new StudentPassFail({
      studentId,
      isPass,
      remarks,
    });

    const addedFailStudent = await newFailStudent.save();
    return addedFailStudent;
  } catch (error) {
    throw error;
  }
};

const addPassStudent = async (studentId, isPass, remarks) => {
  try {
    // Assuming you have the necessary data in the request body
    // For example, the studentId, isPass, and remarks
    const newPassStudent = new StudentPassFail({
      studentId,
      isPass,
      remarks,
    });

    const addedPassStudent = await newPassStudent.save();
    return addedPassStudent;
  } catch (error) {
    throw error;
  }
};

const getStudentDataService = async () => {
  try {
    const allStudents = await Student.find({}, { __v: 0 });
    return allStudents;
  } catch (error) {
    throw error;
  }
};

const getSpecificStudentDataService = async (studentId) => {
  try {
    const specificStudent = await Student.findById(studentId);
    return specificStudent;
  } catch (error) {
    throw error;
  }
};

const updateStudentDataService = async (studentId, updatedData) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });
    return updatedStudent;
  } catch (error) {
    throw error;
  }
};

const deleteStudentDataService = async (studentId) => {
  try {
    const existingStudent = await Student.findById(studentId);
    if (!existingStudent) {
      return null; // Return null if the document doesn't exist
    }

    const deletedStudent = await Student.findByIdAndDelete(studentId);
    return deletedStudent;
  } catch (error) {
    throw error;
  }
};

const getPassStudentsDataService = async () => {
  try {
    const passStudents = await Student.aggregate([
      {
        $match: {
          $expr: {
            $gte: [
              { $min: ['$marks.physics', '$marks.chemistry', '$marks.maths', '$marks.biology'] },
              35,
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          marks: 1,
          isPass: true,
        },
      },
    ]);

    return passStudents;
  } catch (error) {
    throw error;
  }
};

const getFailStudentsDataService = async () => {
  try {
    const failStudents = await Student.aggregate([
      {
        $match: {
          $expr: {
            $lt: [
              { $min: ['$marks.physics', '$marks.chemistry', '$marks.maths', '$marks.biology'] },
              35,
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          marks: 1,
          isPass: false,
        },
      },
    ]);

    return failStudents;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addStudentDataService,
  getStudentDataService,
  deleteStudentDataService,
  getSpecificStudentDataService,
  getPassStudentsDataService,
  getFailStudentsDataService,
  updateStudentDataService,
  addFailStudent,
  addPassStudent,
};