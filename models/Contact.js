// Contact is the contact model (contact data) in the project application

// Contact Model: add mongoose module to file User.js
const mongoose = require('mongoose');

// Contact Model: create new schema object 'ConactSchema' via mongoose module
const ContactSchema = mongoose.Schema({
  // Contact Model: define properties inside of the schema object
  // Note: type 'ObjectId' comes from Schema.Types. in the mongoose module
  // Note: refer or 'ref' indicates the reference to a collection inside MongoDB, which is 'users'
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Contact Model: export model 'contact' / schema 'ContactSchema' via model constructor
module.exports = mongoose.model('contact', ContactSchema);

// Mongoose Model vs Mongoose Schema:
// * Difference: a Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, validators, etc., whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.