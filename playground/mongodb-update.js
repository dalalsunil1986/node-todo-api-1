// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

//findOneAndUpdate

// db.collection('Todos').findOneAndUpdate({
//   _id: new ObjectID("587178feaed71154fd5b6569")
// }, {
//   $set: {
//     completed: true
//     }
//   }, {
//     returnOriginal: false
//   }).then((res) => {
//     console.log(res);
//   });

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID("58717ea56a86e005bb0d9734")
}, {
  $set: {
    name: 'ZaHa'
  },
  $inc: {
    age: 1
  }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  });

  // db.close();
});
