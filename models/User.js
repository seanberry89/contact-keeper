// User is the user model (user data) in the project application

// User Model: add mongoose module to file User.js
const mongoose = require('mongoose');

// User Model: create a new schema from schema object via mongoose
const UserSchema = mongoose.Schema({
  // User Model: define the properties inside the user model
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// User Model: compile new model 'user' (and schema) via method model()
module.exports = mongoose.model('user', UserSchema);


// Mongoose, Model, and Schema Notes:
// * Models are constructors compiled from Schema definitions
// * Models are responsible for creating and reading documents from the underlying MongoDB database
// * Schemas map to the MongoDB database and define the shape of the collection inside a document