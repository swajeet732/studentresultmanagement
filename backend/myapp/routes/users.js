// routes/users.js
const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentcontroller');
//const downloadController = require('../controller/downloadcontroller');
const axios = require('axios')
const csv = require('fast-csv');
//const StudentPassFail = require('../models/studentPassFailModel');
const StudentPassFail = require('../controller/studentpassFail');
const StudentFeescontroller = require('../controller/studentFees');
const aggregate= require('../controller/studentAggregateController');

// Define a route for fetching students in table format

  
// Get pass students
router.get('/passStudents', StudentPassFail.getPassStudents);

// Get fail students
router.get('/failStudents', StudentPassFail.getFailStudents);


//router.get('/passStudents', StudentPassFail.getPassStudents);

// Get fail students
//router.get('/failStudents', StudentPassFail.getFailStudents);

// Add pass student
router.post('/passStudents', StudentPassFail.addPassStudent);

// Add fail student
router.post('/failStudents', StudentPassFail.addFailStudent);

// Get all students
router.get('/students', studentController.getAllStudents);

//update
router.put('/students/:id', studentController.updateStudent);

router.get('/students/:id', studentController.getSpecificStudent);

// routes/users.js
// ... (other imports)

router.get('/searchByDate', studentController.searchByDate);



// Add a new student
router.post('/students', studentController.addStudent);

// Delete a student by ID
router.delete('/students/:id', studentController.deleteStudent);


router.get('/downloadCSV', async (req, res) => {
    try {
      // Fetch data from the getStudent API
      const response = await axios.get("http://localhost:3001/students");
      const data = response.data;
  
      // Create CSV data with dynamic mapping
      const csvData = data.map((student) => {
        const mappedStudent = { name: student.name };
  
        Object.entries(student).forEach(([key, value]) => {
          if (typeof value === 'object') {
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
              mappedStudent[`${key}_${nestedKey}`] = nestedValue;
            });
          } else {
            mappedStudent[key] = value;
          }
        });
  
        return mappedStudent;
      });
  
      // Set response headers
      res.header('Content-Type', 'text/csv');
      res.attachment('students.csv');
  
      // Create a CSV stream and pipe it to the response
      csv.writeToStream(res, csvData, { headers: true, quoteColumns: true })
        .on('error', (error) => {
          console.error('Error writing CSV:', error.message);
          res.status(500).end();
        })
        .on('end', () => res.end());
    } catch (error) {
      console.error('Error fetching data:', error.message);
      res.status(500).end();
    }
  });



  // Download CSV data for search results
router.get('/downloadCSVByDate', async (req, res) => {
    const { date } = req.query;
  
    try {
      const response = await axios.get(`http://localhost:3001/searchByDate?date=${date}`);
      const data = response.data;
  
      const csvData = data.map((student) => ({
        Name: student.name,
        Physics: student.marks.physics,
        Chemistry: student.marks.chemistry,
        Maths: student.marks.maths,
        Biology: student.marks.biology,
      }));
  
      res.header('Content-Type', 'text/csv');
      res.attachment(`search_results_${date}.csv`);
  
      csv.writeToStream(res, csvData, { headers: true, quoteColumns: true })
        .on('error', (error) => {
          console.error('Error writing CSV:', error.message);
          res.status(500).end();
        })
        .on('end', () => res.end());
    } catch (error) {
      console.error('Error fetching data:', error.message);
      res.status(500).end();
    }
  });
  
  router.get('/downloadPassStudentsCSV', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:3001/passStudents');
      const data = response.data;
  
      const csvData = data.map((student) => ({
        Name: student.name,
        Physics: student.marks.physics,
        Chemistry: student.marks.chemistry,
        Maths: student.marks.maths,
        Biology: student.marks.biology,
      }));
  
      res.header('Content-Type', 'text/csv');
      res.attachment('pass_students.csv');
  
      csv.writeToStream(res, csvData, { headers: true, quoteColumns: true })
        .on('error', (error) => {
          console.error('Error writing CSV:', error.message);
          res.status(500).end();
        })
        .on('end', () => res.end());
    } catch (error) {
      console.error('Error fetching pass students:', error);
      res.status(500).end();
    }
  });
  
  // Download CSV data for fail students
  router.get('/downloadFailStudentsCSV', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:3001/failStudents');
      const data = response.data;
  
      const csvData = data.map((student) => ({
        Name: student.name,
        Physics: student.marks.physics,
        Chemistry: student.marks.chemistry,
        Maths: student.marks.maths,
        Biology: student.marks.biology,
      }));
  
      res.header('Content-Type', 'text/csv');
      res.attachment('fail_students.csv');
  
      csv.writeToStream(res, csvData, { headers: true, quoteColumns: true })
        .on('error', (error) => {
          console.error('Error writing CSV:', error.message);
          res.status(500).end();
        })
        .on('end', () => res.end());
    } catch (error) {
      console.error('Error fetching fail students:', error);
      res.status(500).end();
    }
  });
  
  
module.exports = router;





///fees routes..............

// POST: Add a new fee transaction
router.post('/fees', StudentFeescontroller.addFee);

// GET: Get fee details by ID
router.get('/fees/:feeId', StudentFeescontroller.getFeeDetails);

// PUT: Update fee transaction by ID
router.put('/fees/:feeId', StudentFeescontroller.updateFee);

// DELETE: Delete fee transaction by ID
router.delete('/fees/:feeId', StudentFeescontroller.deleteFee);


router.get('/students/:studentId/details', aggregate.aggregateStudentData);










 











