// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //deteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((res) => {
  //   console.log(res);
  // });

  db.collection('Users').deleteMany({name: 'John'}).then((res) => {
    console.log(res);
  });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((res) => {
  //   console.log(res);
  // });

  db.collection('Users').deleteOne({
    _id: new ObjectID("587145ac68173904762b82ff")
  }).then((res) => {
    console.log(res);
  });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
  //   console.log(res);
  // })
  db.collection('Users').findOneAndDelete({name: 'Fernanda'}).then((res) => {
    console.log(res);
  });

  // db.close();
});
