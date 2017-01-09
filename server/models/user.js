var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
  type: String,
  require: true,
  trim: true,
  minlength: 1
}
});

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
