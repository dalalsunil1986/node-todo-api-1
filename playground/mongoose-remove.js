const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


//Delete all files:
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
Todo.findOneAndRemove({_id: '587fadd4f82a7dbc955813b3'}).then((todo) => {
  console.log(todo);
});

// Todo.findByIdAndRemove
Todo.findByIdAndRemove('587fadd4f82a7dbc955813b3').then((todo) => {
  console.log(todo);
});
