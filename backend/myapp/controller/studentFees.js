//controller/studentFees.js
const FeeModel = require('../models/studentFeesModel');
//const StudentFees = require('../models/studentFeesModel');


exports.addFee = async (req, res, next) => {
  try {
    const { amount, userId, status } = req.body;

    // Validate if amount is a valid number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || !isFinite(parsedAmount)) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Create a new fee transaction with the specified status
    const newFee = new FeeModel({
      amount: parsedAmount,
      userId,
      status: status || 'pending', // Set the status from the request or default to 'pending'
    });

    // Save the new fee transaction
    const savedFee = await newFee.save();

    res.status(201).json(savedFee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// Get fee details by ID
exports.getFeeDetails = async (req, res, next) => {
  try {
    const { feeId } = req.params;

    // Find the fee transaction by ID
    const feeDetails = await FeeModel.findById(feeId);

    if (!feeDetails) {
      return res.status(404).json({ message: 'Fee transaction not found' });
    }

    res.json(feeDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update fee transaction by ID
exports.updateFee = async (req, res, next) => {
  try {
    const { feeId } = req.params;
    const updatedData = req.body;

    // Find and update the fee transaction by ID
    const updatedFee = await FeeModel.findByIdAndUpdate(feeId, updatedData, { new: true });

    if (!updatedFee) {
      return res.status(404).json({ message: 'Fee transaction not found' });
    }

    res.json(updatedFee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete fee transaction by ID
exports.deleteFee = async (req, res, next) => {
  try {
    const { feeId } = req.params;

    // Find and delete the fee transaction by ID
    const deletedFee = await FeeModel.findByIdAndDelete(feeId);

    if (!deletedFee) {
      return res.status(404).json({ message: 'Fee transaction not found' });
    }

    res.json({ status: true, deletedFee, message: 'Deleted fee transaction successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
