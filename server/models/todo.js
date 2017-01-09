var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

//Example -- create and save from model
// var newTodo = new Todo({
//   text: 'Edit this video  '
// });
// //
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });

// var johnsTodo = new Todo({
  // text: 'Get laid',
  // completed: true,
  // completedAt: 9999
// });
//
// johnsTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log(e);
// });

module.exports = {Todo};
