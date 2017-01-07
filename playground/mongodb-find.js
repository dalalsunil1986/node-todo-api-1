// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('58715740aed71154fd5b56b1')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos').count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

db.collection('Users').find({name: 'John'}).count().then((res) => {
  console.log(`There are ${res} users with that name:`);
}, (err) => {
  if (err) {
    return console.log('Unable to perform query', err);
  }
});

db.collection('Users').find({name: 'John'}).toArray().then((res) => {
  console.log(JSON.stringify(res, undefined, 2));
}, (err) => {
  if (err) {
    return console.log('Unable to perform query', err);
  }
});


  // db.close();
});
