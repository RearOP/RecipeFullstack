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
  profilePic: {
    type: String,
    default: 'https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png'
  },
  backgroundImage: {
    type: String,
    default: 'https://bdu.ac.bd/uploads/topics/default.png'
  }
});

module.exports = mongoose.model('user', userSchema);