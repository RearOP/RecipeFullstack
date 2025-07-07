const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength:3
  },
  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    required: function () { return !this.googleId; },
    elect: false, 
    minlength:8
  },
  googleId: String,
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
  profilePic: {
    type: String,
    default: 'https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png'
  },
  backgroundImage: {
    type: String,
    default: 'https://bdu.ac.bd/uploads/topics/default.png'
  }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);