const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
   type: String,
   required: true,
   trim: true,
   minlength: 1,
   unique: true,
   validate: {
     validator: validator.isEmail,
     message: '{VALUE} is not a valid email'
   }
 },
 password: {
   type: String,
   required: true,
   minlength: 6
 },
 //tokens is array avail in Mongodb
 tokens: [{
   access: {
     type: String,
     required: true
   },
   token: {
     type: String,
     required: true
   }
 }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

var User = mongoose.model('User', UserSchema);

//Example -- create and save from model
// var newEmail = new User({
//   email: "   HelpMe@Get a Job.com   "
// });
//
// newEmail.save().then((doc) => {
//     console.log('saved email', doc);
// }, (e) => {
//   console.log('Unable to save user email', e);
// });
//
module.exports = {User};
