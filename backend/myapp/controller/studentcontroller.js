
//controllers/studentcontroller.js
const Student = require('../models/studentmodel');


const { addStudentDataService, getStudentDataService, deleteStudentDataService, getSpecificStudentDataService,  updateStudentDataService} = require('../services/auth/studentdataservice');


// controller/studentcontroller.js
// ... (other imports)

exports.updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Call the service function to update a student
    const updatedStudent = await updateStudentDataService(id, updatedData);

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.json(updatedStudent);
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.searchByDate = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const students = await Student.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          marks: 1,
          createdAt: 1,
        },
      },
    ]);

  // Check if no students are found
  if (students.length === 0) {
    return res.status(404).json({ message: 'No students found for the specified date' });
  }

  return res.json(students);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
}
};



exports.addStudent = async (req, res) => {
  const { name, marks } = req.body;

  try {
    const savedStudent = await addStudentDataService({ name, marks });
    res.status(201).json(savedStudent);
  } catch (error) {
    if (error.message === 'Student with the same name already exists') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllStudents = async (req, res, next) => {
  try {
    // Call the service function to get all students
    const allStudents = await getStudentDataService();

    // Check if there are no students
    if (!allStudents || allStudents.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }

    return res.json(allStudents);
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a specific student by ID
exports.getSpecificStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Call the service function to get a specific student
    const specificStudent = await getSpecificStudentDataService(id);

    if (!specificStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.json(specificStudent);
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Call the service function to delete a student
    const deletedStudent = await deleteStudentDataService(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.json({status : true ,deletedStudent , message : 'deleted data sucessful'});
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





// controllers/studentcontroller.js


// ... (your existing functions)

// controllers/studentcontroller.js

// ... (your existing functions)

