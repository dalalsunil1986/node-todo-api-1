const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '587804caf9f50b6f0673368b11';
//
// if (!ObjectId.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

//user.findbyid
var id = '58730612b2c7f9d306461245';

// User.find({
//   _id: id
// }).then((users) => {
//   console.log('Users', users);
// });
//
// User.findOne({
//   _id: id
// }).then((user) => {
//   console.log('User', user);
// })

User.findById(id).then((userById) => {
  if(!userById) {
    console.log('Unable to find user');
  }
  console.log(JSON.stringify(userById, undefined, 2));
}).catch((e) => console.log(e));
//three cases: - id but no user
//print user to screen
//error handler print e to screen
