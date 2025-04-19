const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength:3
  },
  password: {
    type: String,
    required: true,
    minlength:8
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },  
  // add image image
});

module.exports = mongoose.model('user', userSchema);