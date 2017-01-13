var express =  require('express');
var bodyParser = require('body-parser');

const {ObjectId} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/123424
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

    //validate id using isValid

      if (!ObjectId.isValid(id)) {
        //if not valid, stop execution respond with 404 todo not found - send back empty body
        return res.status(404).send();
          // console.log('ID not valid');
      }
    //findByID
      Todo.findById(id).then((todoById) => {
        //success
          //if todo - send it back
            //if no todo - call succeeded, id not found - send back 404 with empty body
          if(!todoById) {
            return res.status(404).send();
          } else {
            res.send({todoById});
          }
      }).catch((e) => {
        //error
          //sendback 400 - and send empty body back
        res.status(400).send();
    });
});


app.listen(3000, () => {
  console.log('started on port 3000');
});

module.exports = {app};
