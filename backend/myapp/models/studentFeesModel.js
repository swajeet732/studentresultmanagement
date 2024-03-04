const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeeModel = new Schema({
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    userId: { type: mongoose.Schema.ObjectId, ref: 'Student', required: true },
});

module.exports = mongoose.model('Transaction', FeeModel);
