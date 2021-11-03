// DB (or data base) is a file for connecting the data stored in MongoDB with the project application in Node.js (via Mongoose Module)

// Connect Database: add mongoose module into file db.js
const mongoose = require('mongoose');

// Connect Database: add config module into file db.js
const config = require('config');

// Connect Database: variable 'db' equals the connection string to MongoDB
const db = config.get('mongoURI');

// Connect Database: create arrow function 'connectDB' to connect with MongoDB
const connectDB = async () => {
  // Connect Database: check the connection to MongoDB via try/catch statement
  // Note: the 'try statement' will check for errors while a block of code is executed
  // Note: the 'catch statement' will execute a block of code if an error is found
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

// Connect Database: export file 'connectDB'
module.exports = connectDB;