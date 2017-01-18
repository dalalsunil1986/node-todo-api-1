const _ = require('lodash');
const express =  require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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
      Todo.findById(id).then((todo) => {
        //success
          //if todo - send it back
            //if no todo - call succeeded, id not found - send back 404 with empty body
          if(!todo) {
            return res.status(404).send();
          } else {
            res.send({todo});
          }
      }).catch((e) => {
        //error
          //sendback 400 - and send empty body back
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
  //get the id
  var id = req.params.id;
  //validate the id -> not valid? return 404
  if(!ObjectId.isValid(id)) {
    return res.status(404).send();
  } else {
      //remove todo by id
      Todo.findByIdAndRemove(id).then((todo) => {
        //success
        if(!todo) {
          //if no doc, send 404
          return res.status(404).send();
        } else {
          //if doc, send doc back with 200
          res.send({todo});
        }
      })
        //error
        .catch((e) => {
          //400 with empty body
          res.status(400).send();
        });
    }
  });

  app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectId.isValid(id)) {
      return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
  }); //app.patch closing bracket

app.listen(port, () => {
  console.log(`started on port ${port}`);
});

module.exports = {app};
