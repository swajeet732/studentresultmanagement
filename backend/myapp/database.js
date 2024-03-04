const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/apexchart', {
  useNewUrlParser: true,
  // Remove the deprecated option
  // useUnifiedTopology: true, // <-- Remove this line
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));
