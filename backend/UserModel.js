const mongoose = require("mongoose");

const UserSchema = new Schema({
  firstname: {
    type: String,
    require: true,
    trim:true,
    maxLength:50
  },
  lastname: {
    type: String,
    require: true,
    trim:true,
    maxLength:50
  },
  password: {
    type: String,
    require: true,
     minLength:6
  },
  email: {
    type: String,
    require: true,
    trim:true,
    unique:true,
    minLength:3,
    maxLength:30,
    lowercase:true
  },
});

const User = mongoose.model("users", UserSchema);

module.exports = {
  User,
};
