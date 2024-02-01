const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [5, "Name must be altes 5 char"],
    maxLenght: [50, "Name should be less than 50 char"],
    lowercase: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please fill in a valid email address",
    ],
    required: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [8, "password must be less than 8 char"]
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// we are hashing the password

userSchema.pre('save',async function(next){
  if(this.isModified('password'))
  {
    this.password = await bcrypt.hash(this.password,12);
  }
  next();
})

module.exports = mongoose.model("users", userSchema);
