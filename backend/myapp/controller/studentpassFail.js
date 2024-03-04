const { getFailStudentsDataService, getPassStudentsDataService, addPassStudent, addFailStudent } = require('../services/auth/studentdataservice');

exports.getPassStudents = async (req, res, next) => {
  try {
    const passStudents = await getPassStudentsDataService();
    res.json(passStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getFailStudents = async (req, res, next) => {
  try {
    const failStudents = await getFailStudentsDataService();
    res.json(failStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add a pass student
exports.addPassStudent = async (req, res) => {
  try {
    const { studentId, isPass, remarks } = req.body;

    // Call the corresponding function in the service to add a pass student
    const addedPassStudent = await addPassStudent(studentId, isPass, remarks);

    return res.status(201).json(addedPassStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add a fail student
exports.addFailStudent = async (req, res) => {
  try {
    const { studentId, isPass, remarks } = req.body;

    // Call the corresponding function in the service to add a fail student
    const addedFailStudent = await addFailStudent(studentId, isPass, remarks);

    return res.status(201).json(addedFailStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
